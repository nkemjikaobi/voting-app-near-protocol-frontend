import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import ContestantCard from '../../../components/ContestantCard';
import VotingContext from '../../../context/voting/VotingContext';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { utils } from 'near-api-js';
import CreateContestant from '../../../modals/CreateContestant';

const SingleElection = () => {
	const router = useRouter();
	const query = router.query;
	const votingContext = useContext(VotingContext);
	const [loading, setLoading] = useState(true);

	const {
		userElections,
		logout,
		wallet,
		balance,
		checkIfSignedIn,
		connectToNear,
		loadContract,
		getBalance,
		isSignedIn,
		contract,
		getUserElections,
	} = votingContext;

	const {
		format: { formatNearAmount },
	} = utils;

	const id: any = query.id;

	const [election, setElection] = useState<any>(null);

	const [createContestant, setCreateContestant] = useState(false);

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
		checkIfSignedIn(wallet, contract);

		if (!isSignedIn) {
			//router.push('/');
		}
		//eslint-disable-next-line
	}, [isSignedIn, wallet, contract]);

	useEffect(() => {
		if (contract) {
			getUserElections(contract);
		}
		//eslint-disable-next-line
	}, [contract]);

	useEffect(() => {
		if (userElections) {
			const election =
				userElections &&
				userElections.filter((election: any) => election.id === Number(id));
			setElection(election[0]);
			setTimeout(() => {
				setLoading(false);
			}, 7000);
		}
		//eslint-disable-next-line
	}, [userElections]);

	const handleStatus = (status: number) => {
		switch (status) {
			case 0:
				return 'not started';
			case 1:
				return 'in progress';
			case 2:
				return 'ended';

			default:
				break;
		}
	};

	return (
		<div>
			<Head>
				<title>Dashboard</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='container mx-auto'>
				<Toaster position='top-right' />
				<div className={`${createContestant && 'blur-lg'} mt-8`}>
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
						{election && (
							<h3 className='my-8 text-2xl mx-4'>
								{election.name}
								{'=>'}
								<span className='uppercase'>
									{handleStatus(election.status)}
								</span>
							</h3>
						)}
						<button
							onClick={() => setCreateContestant(true)}
							className='bg-[#4B60B0] mr-4 flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900'
						>
							create contestant
						</button>
						<Link href='/dashboard'>
							<a className='bg-[#4B60B0] mr-4 flex items-center justify-center text-white rounded-md uppercase px-5 py-3 hover:bg-slate-900'>
								All Elections
							</a>
						</Link>
					</div>
					<div className=' grid grid-cols-1 md:grid-cols-3 gap-4'>
						{loading ? (
							<>Loading...</>
						) : election && election.contestants.length > 0 ? (
							election.contestants.map((contestant: any, index: number) => (
								<div key={index}>
									<ContestantCard election={election} contestant={contestant} />
								</div>
							))
						) : (
							<div>No contestants yet...</div>
						)}
					</div>
				</div>
				<div>
					{createContestant && (
						<div className='absolute w-[500px] top-[300px] left-[600px]'>
							<CreateContestant
								setCreateContestant={setCreateContestant}
								electionId={Number(id)}
							/>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default SingleElection;