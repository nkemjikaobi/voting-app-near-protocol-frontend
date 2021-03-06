import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import VotingContext from '../../context/voting/VotingContext';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { utils } from 'near-api-js';
import ElectionCard from '../../components/ElectionCard';
import { Toaster } from 'react-hot-toast';
import CreateElection from '../../modals/CreateElection';

const DashboardPage: NextPage = () => {
	const votingContext = useContext(VotingContext);
	const [loading, setLoading] = useState(true);

	const {
		format: { formatNearAmount },
	} = utils;

	const {
		isSignedIn,
		checkIfSignedIn,
		wallet,
		contract,
		logout,
		connectToNear,
		loadContract,
		getBalance,
		balance,
		getUserElections,
		userElections,
	} = votingContext;
	const router = useRouter();

	// Establish a connection to the NEAR blockchain on component mount
	useEffect(() => {
		connectToNear();
		//eslint-disable-next-line
	}, []);

	// Initialize the contract object when the wallet is available
	useEffect(() => {
		if (wallet) {
			loadContract(wallet);

			// We can get the account balance of a user through the wallet
			// Since this is requesting data from the blockchain, the method returns a Promise
			getBalance(wallet);
		}
		//eslint-disable-next-line
	}, [wallet]);

	useEffect(() => {
		if (contract) {
			checkIfSignedIn(wallet, contract);
		}
	//eslint-disable-next-line
	}, [contract]);

	useEffect(() => {
		if (contract) {
			getUserElections(contract);
			setTimeout(() => {
				setLoading(false);
			}, 7000);
		}
		//eslint-disable-next-line
	}, [contract]);

	const [createElectionn, setCreateElection] = useState(false);

	return (
		<div>
			<Head>
				<title>Dashboard</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='container mx-auto'>
				<Toaster position='top-right' />
				<div className={`${createElectionn && 'blur-lg'} mt-8`}>
					<nav className=' flex justify-between items-center'>
						<Link href='/'>
							<a href='#' className='text-2xl font-bold ml-4'>
								Voting Dapp
							</a>
						</Link>
						<div className='flex mr-4'>
							<button className='bg-[#4B60B0] mr-4 flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900'>
								{formatNearAmount(balance.available, 4)} NEAR
							</button>
							<button
								onClick={() => logout(wallet, router)}
								className='bg-[#4B60B0] flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900'
							>
								logout
							</button>
						</div>
					</nav>
					<div className='flex items-center justify-between'>
						<h3 className='my-8 text-2xl mx-4'>All Elections</h3>
						<button
							onClick={() => setCreateElection(true)}
							className='bg-[#4B60B0] mr-4 flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900'
						>
							create election
						</button>
					</div>

					<div className=' grid grid-cols-1 md:grid-cols-3 gap-4'>
						{loading ? (
							<>Loading...</>
						) : userElections ? (
							userElections.map((election: any, index: number) => (
								<div key={index}>
									<ElectionCard election={election} />
								</div>
							))
						) : (
							<div>No elections yet...</div>
						)}
					</div>
				</div>
				<div>
					{createElectionn && (
						<div className='absolute w-[500px] top-[300px] left-[600px]'>
							<CreateElection setCreateElection={setCreateElection} />
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default DashboardPage;
