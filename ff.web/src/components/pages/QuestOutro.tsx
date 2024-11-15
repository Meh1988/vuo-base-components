import { useEffect, useState, CSSProperties, useRef } from 'react';
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom';
import { analytics } from '../../config/firebase';
import { logEvent } from 'firebase/analytics';

// import AchievementOutro from '@vuo/molecyles/AchievementOutro';
import Button from '@vuo/atoms/Button';
import Chip from '@vuo/atoms/Chip';
// import Modal from '@vuo/atoms/Modal'
// import Page from '@vuo/atoms/Page'
// import Popup from '@vuo/atoms/Popup'
import QuestOutroViewModel from '@vuo/viewModels/QuestOutroViewModel';

import style from './QuestOutro.module.scss'
import SkewedTitleList from '../molecules/SkewedTitleList';
import Page from '../templates/Page';

const QuestOutro = observer(() => {

  const navigate = useNavigate()

  const { id } = useParams()
  const [viewModel] = useState<QuestOutroViewModel>(() => new QuestOutroViewModel(id!))
  const [, setPopupVisible] = useState<boolean>(false)

  const achievementScroller = useRef<HTMLDivElement>(null)
  const achievementScrollerTrack = useRef<HTMLDivElement>(null)
  const AchievementDelay = 1000

  useEffect(() => {
    window.scrollTo(0, 0)
    const startInterval = 1000;
    const achievementScrollInterval = 500;

    const achievements = viewModel.playerAchievementsForCompletedQuest;
    if (!achievements || achievements.length === 0) return undefined;

    const scroller = achievementScroller.current;
    const scrollerTrack = achievementScrollerTrack.current;
    if (!scroller || !scrollerTrack) return undefined;

    let currentIndex = 0;
    let intervalId: NodeJS.Timeout

    setInterval(() => {
      intervalId = setInterval(() => {

        if (currentIndex >= achievements.length) {
          clearInterval(intervalId);
          scroller.classList.add(style.outro_achievements_scroller_snap)
          return undefined;
        }

        // Calculate the new scroll position
        const achievementElement = scrollerTrack.children[currentIndex] as HTMLElement;
        const newScrollPosition = achievementElement.offsetLeft;

        // Scroll the scroller container
        scroller.scrollTo({
          left: newScrollPosition,
          behavior: 'smooth'
        });

        currentIndex += 1
        return undefined
      }, achievementScrollInterval)
    }, startInterval);

    const calculateStyle = (element: HTMLElement): CSSProperties => {
      const scrollLeft = scroller.scrollLeft + scroller.clientWidth / 2;
      const elementCenter = element.offsetLeft + element.clientWidth / 2;
      const distanceFromCenter = Math.abs(scrollLeft - elementCenter);
      const maxDistance = scroller.clientWidth / 2;

      const opacity = 1.0 + (-0.5 / maxDistance) * distanceFromCenter;
      const scale = 1.0 + (-0.1 / maxDistance) * distanceFromCenter;
      return {
        opacity: `${opacity}`,
        scale: `${scale}`
      };
    };

    const updateStylesOnScroll = () => {
      if (!scrollerTrack) return;

      Array.from(scrollerTrack.children).forEach(child => {
        const element = child as HTMLElement;
        const newStyle = calculateStyle(element);
        Object.assign(element.style, newStyle);
      });
    };

    scroller.addEventListener('scroll', updateStylesOnScroll);
    updateStylesOnScroll();

    return () => {
      clearInterval(intervalId);
    };
  }, [viewModel.playerAchievementsForCompletedQuest]);

  useEffect(() => {
    if (viewModel.playerQuest) {
      // Track quest completion
      logEvent(analytics, 'quest_completed', {
        quest_id: viewModel.playerQuest.id,
        quest_name: viewModel.playerQuest.name,
        // quest_duration: viewModel.playerQuest.duration, // You'll need to add this to your Quest model
        xp_earned: viewModel.combinedPlayerSkillsForCompletedQuest?.reduce(
          (prevValue, { challenge_rating }) => prevValue + challenge_rating, 
          0
        ),
        achievements_earned: viewModel.playerAchievementsForCompletedQuest?.length || 0,
        skills_earned: viewModel.combinedPlayerSkillsForCompletedQuest?.map(skill => skill.name) || [],
      });

      // Track individual achievements
      viewModel.playerAchievementsForCompletedQuest?.forEach(achievement => {
        logEvent(analytics, 'achievement_unlocked', {
          achievement_id: achievement.achievement.id,
          achievement_name: achievement.achievement.name,
          quest_id: viewModel.playerQuest.id,
          quest_name: viewModel.playerQuest.name,
          achievement_type: achievement.achievement.type, // if you have achievement types
          achievement_description: achievement.achievement.description,
          achievement_xp: achievement.achievement.xpValue // if achievements have XP values
        });
      });

      // Track skills gained
      viewModel.combinedPlayerSkillsForCompletedQuest?.forEach(skill => {
        logEvent(analytics, 'skill_gained', {
          skill_name: skill.name,
          skill_xp: skill.challenge_rating,
          quest_id: viewModel.playerQuest.id,
          quest_name: viewModel.playerQuest.name
        });
      });
    }
  }, [viewModel.playerQuest, viewModel.playerAchievementsForCompletedQuest, viewModel.combinedPlayerSkillsForCompletedQuest]);

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   viewModel.registerShadowAccount(username).then(() => {
  //     Modal.alert({
  //       content: 'Account registered!',
  //       confirmText: 'Nice!',
  //       onConfirm: () => {
  //         navigate('/quests')
  //       }
  //     })
  //   })
  // };

  const onContinue = () => {
    navigate(-3)
    // const sneakpeekorigin = localStorage.getItem("sneakpeekorigin")
    // if (sneakpeekorigin) {
    //   navigate(`/sneakpeek/${sneakpeekorigin}`)
    //   localStorage.removeItem("sneakpeekorigin")
    // } else {
    //   navigate('/quests')
    // }
  }

  const scoreScaleStyle: CSSProperties = {
    '--score-scale': `${1}`
  } as CSSProperties;

  const titleList = () => [
    { title: viewModel.playerQuest?.name || viewModel.playerQuest?.recipe.name || "Quest" },
    { title: "Completed" }
  ]

  return (
    <Page>
      {!viewModel.loading && viewModel.playerQuest && (
        <>
          <SkewedTitleList items={titleList()} sequential={false} />
          <div style={{ marginTop: 'var(--space-88)' }} />
          <div className={`${style.outro_achievements}`}>
            {viewModel.playerAchievementsForCompletedQuest && viewModel.playerAchievementsForCompletedQuest.length > 0 && (
              <>
                <h2 className={`${style.outro_achievements_title}`}>
                  Achievements unlocked
                </h2>
                <div
                  className={`${style.outro_achievements_scroller} ${style.outro_achievements_scroller_snap}`}
                  ref={achievementScroller}>
                  <div
                    className={`${style.outro_achievements_scroller_track}`}
                    ref={achievementScrollerTrack}
                  >
                    {viewModel.playerAchievementsForCompletedQuest.map(playerAchievement =>
                    (
                      <div
                        className={`${style.outro_achievements_scroller_box}`}
                        key={playerAchievement.achievement.name}>
                        {/* <AchievementOutro playerAchievement={playerAchievement} /> */}
                      </div>
                    )
                    )}
                  </div>
                </div>
              </>
            )}
            <div className={`${style.outro_skills_score_container}`}>
              <div className={`${style.outro_skills}`}>
                {Array.from(viewModel.combinedPlayerSkillsForCompletedQuest?.entries() || []).map(([skill, count], index) => {
                  const verticalPosition = `position${Math.floor(Math.random() * 4) + 1}`;
                  const horizontalPosition = ['left', 'center', 'right'][Math.floor(Math.random() * 3)];

                  const skillStyle: CSSProperties = {
                    backgroundColor: "var(--surface-brand-purple)",
                    '--delay': `${AchievementDelay + 300 * (index + 1)}ms`
                  } as CSSProperties;

                  return (
                    <div
                      className={`${style.skill} ${style[verticalPosition]} ${style[horizontalPosition]}`}
                      key={`${skill}_index`}
                      style={skillStyle}
                    >
                      <div>
                        {/* TODO fix icons  */}
                        {/* <Icon name="chef-knife" /> */}

                      </div>
                      <div className={`${style.skill_title} font-weight-600`}>
                        {skill}
                      </div>
                      <Chip className={`${style.skill_chip}`}>+ {count}XP</Chip>
                    </div>
                  )
                })}
              </div>
              <div
                className={`${style.outro_score}`}
                style={scoreScaleStyle}
              >
                <div className={`${style.outro_skill_score_value}`}>
                  {Array.from(viewModel.combinedPlayerSkillsForCompletedQuest?.values() || []).reduce((prevValue, count) => prevValue + count, 0)}
                </div>
                <small className={`${style.outro_skill_text}`}>
                  Cooking
                  <br />
                  Skill XP
                  <br />
                  Earned
                </small>
              </div>
            </div>
          </div>
          <div className={style.outro_actions}>
            <Button block className='btn btn-large btn-raised' color='primary' onClick={onContinue}>Continue</Button>
            {viewModel.shadowAccount && (
              <>
                <p style={{ width: "100%", textAlign: "center", marginBottom: "var(--space-8)" }}>or</p>
                <Button block className='btn btn-large btn-raised' color='primary' onClick={() => setPopupVisible(true)}>Save your progress!</Button>
              </>
            )}
          </div>
          {/* <Popup //TODO enable
            bodyStyle={{
              padding: '24px',
              textAlign: 'center',
            }}
            position='bottom'
            visible={popupVisible}
            onMaskClick={() => setPopupVisible(false)}
          >
            <form onSubmit={handleSubmit} autoComplete="on">
              <input
                type="text"
                id="username"
                aria-labelledby="username-label"
                autoComplete="username webauthn"
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
              <Button
                block
                className="btn btn-blue btn-large btn-raised mt16"
                color="primary"
                fill="solid"
                size="large"
                type="submit"
              >
                Register
              </Button>
            </form>
          </Popup> */}
        </>
      )}
      {!viewModel.playerQuest && (
        <div>No completed quest yet! Go and pick a quest or campaign!</div>
      )}
    </Page>
  );
});

export default QuestOutro;