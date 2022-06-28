import React, { useContext, useState } from 'react';
import VotingContext from '../context/voting/VotingContext';
import { ImSpinner9 } from 'react-icons/im';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const ElectionCard = ({ election }: any) => {
	const votingContext = useContext(VotingContext);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const { startElection, endElection, contract } = votingContext;

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

	const handleStartElection = async (e: any, contract: any, id: any) => {
		e.stopPropagation();
		setLoading(true);
		await startElection(contract, id);
		toast.success('Election started');
		setLoading(false);
	};
	const handleEndElection = async (e: any, contract: any, id: any) => {
		e.stopPropagation();
		setLoading(true);
		await endElection(contract, id);
		toast.success('Election ended');
		setLoading(false);
	};
	return (
		<div
			className='bg-black text-white p-4 drop-shadow-md rounded-md cursor-pointer h-[250px] mx-4'
			onClick={() => router.push(`/dashboard/election/${election.id}`)}
		>
			<h4 className='flex items-center'>
				Name:
				<span className='text-[#4B60B0] text-xl ml-2'>{election.name}</span>
			</h4>
			<h4 className='my-2 flex items-center'>
				Position:
				<span className='text-[#4B60B0] text-xl ml-2'>
					{election.position}
				</span>{' '}
			</h4>
			<h4 className='my-2 flex items-center'>
				Contestants:
				<span className='text-[#4B60B0] text-xl ml-2'>
					{election.contestants.length}
				</span>{' '}
			</h4>
			<h4
				className={`${
					election.status === 0
						? 'bg-red-500'
						: election.status === 1
						? 'bg-blue-500'
						: 'bg-green-500'
				} mt-4 w-3/4  md:w-3/4 xl:w-2/4 px-2  whitespace-nowrap py-2 rounded-md `}
			>
				Status:
				<span className=' text-base uppercase w-1/4 ml-2'>
					{handleStatus(election.status)}{' '}
				</span>{' '}
			</h4>
			<div className='flex items-center justify-between'>
				{election.status === 0 && (
					<button
						onClick={e => handleStartElection(e, contract, election.id)}
						className='bg-[#4b60b0] hover:bg-blue-500 flex items-center justify-center px-4 py-2 rounded-md uppercase mt-4'
					>
						{loading ? <ImSpinner9 className='animate-spin' /> : 'start'}
					</button>
				)}
				{election.status === 1 && (
					<button
						onClick={e => handleEndElection(e, contract, election.id)}
						className='bg-[#4b60b0] hover:bg-blue-500 flex items-center justify-center px-4 py-2 rounded-md uppercase mt-4'
					>
						{loading ? <ImSpinner9 className='animate-spin' /> : 'end'}
					</button>
				)}
			</div>
		</div>
	);
};

export default ElectionCard;
