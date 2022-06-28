import React, { useReducer } from 'react';
import VotingContext from './VotingContext';
import VotingReducer from './VotingReducer';
import { getConfig } from '../../config';
import {
	CONNECT_TO_NEAR,
	LOAD_CONTRACT,
	GET_BALANCE,
	CHECK_IF_SIGNED_IN,
	LOGOUT,
	GET_USER_ELECTIONS,
} from '../types';
import { connect, WalletConnection, Contract } from 'near-api-js';

const VotingState = props => {
	const initialState = {
		wallet: null,
		contract: null,
		balance: '',
		isSignedIn: false,
		userElections: null,
	};

	const [state, dispatch] = useReducer(VotingReducer, initialState);

	// Connect to near
	const connectToNear = async () => {
		try {
			const near = await connect(getConfig());
			const wallet = new WalletConnection(near);

			dispatch({
				type: CONNECT_TO_NEAR,
				payload: wallet,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// Load contract
	const loadContract = wallet => {
		try {
			const contract = new Contract(
				wallet.account(),
				'votingapp.testnet',
				{
					viewMethods: [],
					changeMethods: [
						'startElection',
						'endElection',
						'addContestant',
						'vote',
						'createElection',
						'getUserElections',
					],
				}
			);

			dispatch({
				type: LOAD_CONTRACT,
				payload: contract,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// Get balance
	const getBalance = async wallet => {
		try {
			const balance = await wallet.account().getAccountBalance();
			dispatch({
				type: GET_BALANCE,
				payload: balance,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// Check if signed in
	const checkIfSignedIn = (wallet, contract) => {
		const isSignedIn = Boolean(wallet && wallet.isSignedIn() && contract);
		dispatch({
			type: CHECK_IF_SIGNED_IN,
			payload: isSignedIn,
		});
	};

	// Login
	const login = async (wallet, router) => {
		try {
			wallet.requestSignIn({
				contractId: 'votingapp.testnet',
				methodNames: [
					'startElection',
					'endElection',
					'addContestant',
					'vote',
					'createElection',
					'getUserElections',
				],
			});
			router.push('/dashboard');
		} catch (error) {
			console.log(error);
		}
	};

	// Logout
	const logout = (wallet, router) => {
		wallet.signOut();
		// redirect to home page
		dispatch({
			type: LOGOUT,
		});
		router.push('/');
	};

	//Get user elections
	const getUserElections = async contract => {
		try {
			const userElections = await contract.getUserElections();
			dispatch({
				type: GET_USER_ELECTIONS,
				payload: userElections,
			});
		} catch (error) {
			console.log(error);
		}
	};

	//Start election
	const startElection = async (contract, electionId) => {
		try {
			await contract.startElection({
				args: { electionId },
			});
			await getUserElections(contract);
		} catch (error) {
			console.log(error);
		}
	};

	//End election
	const endElection = async (contract, electionId) => {
		try {
			await contract.endElection({
				args: { electionId },
			});
			await getUserElections(contract);
		} catch (error) {
			console.log(error);
		}
	};

	//Create election
	const createElection = async (contract, name, position, electionKey) => {
		try {
			await contract.createElection({
				args: { name, position, electionKey },
			});
			await getUserElections(contract);
		} catch (error) {
			console.log(error);
		}
	};

	//Add contestant
	const addContestant = async (
		contract,
		name,
		bio,
		numberOfVotes,
		electionId
	) => {
		try {
			await contract.addContestant({
				args: { name, bio, numberOfVotes, electionId },
			});
			await getUserElections(contract);
		} catch (error) {
			console.log(error);
		}
	};

	//Vote
	const vote = async (contract, contestantId, electionKey) => {
		try {
			await contract.vote({
				args: { contestantId, electionKey },
			});
			await getUserElections(contract);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<VotingContext.Provider
			value={{
				wallet: state.wallet,
				contract: state.contract,
				balance: state.balance,
				isSignedIn: state.isSignedIn,
				userElections: state.userElections,
				allElections: state.allElections,
				connectToNear,
				loadContract,
				getBalance,
				checkIfSignedIn,
				login,
				logout,
				getUserElections,
				startElection,
				endElection,
				createElection,
				addContestant,
				vote
			}}
		>
			{props.children}
		</VotingContext.Provider>
	);
};

export default VotingState;
