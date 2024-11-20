import { useEffect, useRef, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { Quest } from '@vuo/models/Quest';
import { UserGroupMembership } from '@vuo/models/UserGroupMembership';
import { Resource } from '@vuo/models/Resource';
import Button from '@vuo/atoms/Button';
import Space from '@vuo/atoms/Space';
// import Icon from '@vuo/atoms/Icon';
// import IconNames from "@vuo/models/IconTypes";
import { ChannelUser } from '@vuo/stores/WebSocketStore';
// import ShareIcon from "@vuo/assets/fixfood/icons/share-link.svg?react";
import QuestPrepTask from './QuestPrepTask';
import styles from './QuestCard.module.scss'
import PlayerItem from './PlayerItem';

interface Result {
  color: string;
  currentUser: boolean;
  nickname: string;
  username: string;
}

export type QuestTaskProps = {
  quest: Quest;
  onAddGroupMembership?: (nickname: string) => void;
  onStartQuest?: () => void;
  onCloseSession?: () => void;
  onCreateSession?: () => void;
  onLeaveSession?: () => void;
  hideStartButton?: boolean;
  isCurrentUserHost: boolean;
  multiplayerSessionURL?: string;
  multiplayerUsers: ChannelUser[];
  groupMembers: UserGroupMembership[];
}

function QuestCard(props: QuestTaskProps) {
  const {
    onAddGroupMembership,
    onStartQuest,
    onCloseSession,
    onCreateSession,
    onLeaveSession,
    multiplayerUsers = [],
    multiplayerSessionURL,
    isCurrentUserHost,
    quest,
    groupMembers = [],
    hideStartButton = false
  } = props;

  const [showMiniGameSelector, setShowMiniGameSelector] = useState<boolean>(false)
  const [membershipName, setMembershipName] = useState<string>("")
  const miniGameDialog = useRef<HTMLDialogElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (miniGameDialog.current === event.target) {
      setShowMiniGameSelector(false)
    }
  }

  const shareUrl = (sessionId: string) => {
    const currentDomain = window.location.origin;
    return `${currentDomain}/app/multiplayer/${sessionId}/join`;
  }

  function copyToClipboard(sessionId: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl(sessionId))
    }
  }

  const imageUrl = () => (quest?.media?.image || quest.recipe?.media?.image) || ''

  function mergeResources(resources: Resource[]): Resource[] {
    const mergedResourcesMap: { [key: string]: Resource } = {};
    resources.forEach(resource => {
      const key = `${resource.name}_${resource.unit}`;
      if (mergedResourcesMap[key]) {
        mergedResourcesMap[key].quantity += resource.quantity;
      } else {
        mergedResourcesMap[key] = { ...resource };
      }
    });
    return Object.values(mergedResourcesMap);
  }

  function mergeUserGroupAndChannel(
    userGroupMemberships: UserGroupMembership[],
    channelUsers: ChannelUser[]
  ): Result[] {
    const results: Result[] = [];

    const channelUserMap = new Map<string, ChannelUser>();
    channelUsers.forEach(channelUser => {
      channelUserMap.set(channelUser.id, channelUser);
    });

    const userGroupMembershipMap = new Map<string, UserGroupMembership>();
    userGroupMemberships.forEach(membership => {
      userGroupMembershipMap.set(membership.userId?.id || membership.nickname, membership);
    });

    // Combine data from channelUsers
    channelUsers.forEach(channelUser => {
      const membership = userGroupMembershipMap.get(channelUser.id);
      results.push({
        color: channelUser.color,
        currentUser: channelUser.currentUser,
        nickname: membership ? membership.nickname : "",
        username: channelUser.username
      });
    });

    // Add remaining memberships that don't have matching channel users
    userGroupMemberships.forEach(membership => {
      if (!channelUserMap.has(membership.userId?.id || membership.nickname)) {
        results.push({
          color: "",
          currentUser: false,
          nickname: membership.nickname,
          username: membership.userId?.username || ""
        });
      }
    });

    return results;
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <div className={styles.card_container}>
      <div
        className={styles.card_thumb}
        style={{
          backgroundImage: `url(${imageUrl()})`
        }}>
        <div className={`${styles.intro_recipe_name_chip}`}>
          {quest.name ? quest.name : quest.recipe.name}
        </div>
        <Button
          style={{
            backgroundColor: "black",
            borderWidth: "0",
            color: "var(--text-primary)",
            position: 'absolute',
            bottom: 'var(--space-16)',
            right: 'var(--space-16)',
            display: "none" // DISABLED MOMENTARILY
          }}
          onClick={() => setShowMiniGameSelector(true)}
        >
          {/* <Icon name='plus-math' /> */}
          Boost
        </Button>
      </div>
      <Space direction='vertical' style={{ "--gap-vertical": "16px", padding: "16px" }}>
        <div style={{ color: "var(--white)", fontSize: "1.4em" }}>
          {quest.recipe?.description}
        </div>
        {multiplayerSessionURL && (
          <div >
            <div >
              <Button
                block
                onClick={() => isCurrentUserHost ? onCloseSession?.() : onLeaveSession?.()}
              >{isCurrentUserHost ? 'Close lobby' : 'Leave lobby'}</Button>
            </div>
            <div
              style={{ backgroundColor: 'var(--gray-800)', color: 'white' }}>
              <div >
                <h2 style={{ color: 'white' }}>Multiplayer lobby</h2>
              </div>
              <div >
                {isCurrentUserHost && (
                  <div >
                    <input

                      type="text"
                      aria-labelledby="username-label"
                      placeholder="Nickname"
                      value={membershipName}
                      onChange={(event) => setMembershipName(event.target.value)}
                    />
                    <Button
                      onClick={() => {
                        setMembershipName("")
                        onAddGroupMembership?.(membershipName)
                      }}>Add user</Button>
                  </div>
                )}
                <div >
                  {mergeUserGroupAndChannel(groupMembers, multiplayerUsers).map(user => {
                    const title = (username: string, nickname?: string) => nickname || username
                    return (
                      <div style={{ display: 'flex' }}>
                        <PlayerItem
                          color={user.color}
                          title={user.currentUser ? "You" : title(user.username, user?.nickname)}
                        />
                      </div>)
                  }
                  )}
                </div>
              </div>
              {isCurrentUserHost && (
                <div
                  style={{ backgroundColor: 'var(--gray-1000)' }}>
                  <h2>Invite players</h2>
                  <span>Share this link or QR code to invite friends for family to this Quest.</span>
                  <span>They don&apos;t even need a Fix Food account!</span>
                  <div >
                    <QRCode
                      value={shareUrl(multiplayerSessionURL)}
                      style={{ borderRadius: '10px' }} />
                  </div>
                  <Button
                    onClick={() => copyToClipboard(multiplayerSessionURL)}>
                    <div >
                      <span>Invite with a link</span>
                    </div>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        {
          !multiplayerSessionURL && (
            <div className={styles.enable_multiplayer_container}>
              <Button
                style={{ backgroundColor: 'var(--surface-secondary)' }}
                onClick={() => onCreateSession?.()}
              >Enable Multiplayer Mode</Button>
            </div>
          )
        }
        {
          quest.recipe?.resources && (
            <QuestPrepTask resources={mergeResources(quest.recipe.resources)} servingSize={quest.recipe.servingSize} />
          )
        }
        {
          !hideStartButton && (
            <Button
              style={{ width: '100%' }}
              onClick={() => { onStartQuest?.() }}
            >Get Cooking!</Button>
          )
        }
      </Space>
      <dialog ref={miniGameDialog} open={showMiniGameSelector}>
        {/* <QuestMinigameSelector miniGames={availableMiniGames} onMiniGamesSelected={onMiniGamesSelected} /> */}
      </dialog>
    </div>
  );
};

export default QuestCard;
