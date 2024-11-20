import Section from '@vuo/components/atoms/Section'
import LoginViewModel from '@vuo/viewModels/LoginViewModel';
import { useState } from 'react'
import CircularProgressIndicator from '@vuo/components/atoms/CircularProgressIndicator/CircularProgressIndicator';
import Button from '@vuo/components/atoms/Button';
import { observer } from 'mobx-react-lite';
import styles from './FinishOnboardingPrompt.module.scss';

interface FinishOnboardingPromptProps {
	handleContinue: () => void;
}

export default observer(function FinishOnboardingPrompt({handleContinue}: FinishOnboardingPromptProps) {
	const [viewModel] = useState(() => new LoginViewModel());
	const profile = viewModel.sessionDataStore.profile;

	const getFilteredProfile = (profile: any) => {
		if (!profile) return {};
		const excludedFields = ["userId", "onboardingStatus", "createdAt", "updatedAt", "_id", "userName", "__v"];
		return Object.fromEntries(
			Object.entries(profile).filter(([key]) => !excludedFields.includes(key))
		);
	};

	const calculateProgress = (filteredProfile: Record<string, any>) => {
		const isFieldComplete = (value: any) => 
			value !== "" && 
			value !== null && 
			value !== undefined && 
			!(Array.isArray(value) && value.length === 0) &&
			value !== 0;

		const totalFields = Object.keys(filteredProfile).length;
		const completedFields = Object.values(filteredProfile).filter(isFieldComplete).length;
		return (completedFields / totalFields) * 100;
	};

	const filteredProfile = getFilteredProfile(profile);
	const progressPercentage = calculateProgress(filteredProfile);

	return (
		<Section>
			<h2>Profile complete: </h2>
			<div className={styles.progressIndicatorContainer}>
				<CircularProgressIndicator progress={progressPercentage} />
			</div>
			<p>Continue the onboarding to get personalized content!</p>
			<Button onClick={handleContinue}>Continue</Button>
		</Section>
	);
})
