import React, { useContext, useState } from 'react';
import VotingContext from '../context/voting/VotingContext';
import { ImSpinner9 } from 'react-icons/im';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const ContestantCard = ({ contestant, election }: any) => {
	const votingContext = useContext(VotingContext);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const { vote, contract } = votingContext;

	const handleVote = async (
		e: any,
		contract: any,
		contestantId: any,
		electionKey: any
	) => {
		e.stopPropagation();
		setLoading(true);
		await vote(contract, contestantId, electionKey);
		toast.success('Vote successful');
		setLoading(false);
	};

	return (
		<div
			className='bg-black text-white p-4 drop-shadow-md rounded-md cursor-pointer h-[250px] mx-4'
			onClick={() => router.push(`/dashboard/election/${contestant.id}`)}
		>
			<h4 className='flex items-center'>
				Name:
				<span className='text-[#4B60B0] text-xl ml-2'>{contestant.name}</span>
			</h4>
			<h4 className='my-2 flex items-center'>
				Bio:
				<span className='text-[#4B60B0] text-xl ml-2'>
					{contestant.bio}
				</span>{' '}
			</h4>
			<h4 className='my-2 flex items-center'>
				Number of Votes:
				<span className='text-[#4B60B0] text-xl ml-2'>
					{contestant.numberOfVotes}
				</span>{' '}
			</h4>
			<div className='flex items-center justify-between'>
				<button
					onClick={e =>
						handleVote(e, contract, contestant.id, election.electionKey)
					}
					className={`bg-[#4b60b0] hover:bg-blue-500 flex items-center justify-center px-4 py-2 rounded-md uppercase mt-4 ${election.status !== 1 && 'pointer-events-none opacity-40 cursor-not-allowed'}`}
				>
					{loading ? <ImSpinner9 className='animate-spin' /> : 'vote'}
				</button>
			</div>
		</div>
	);
};

export default ContestantCard;
