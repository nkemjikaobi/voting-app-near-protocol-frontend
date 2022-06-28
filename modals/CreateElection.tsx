import React, { useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import VotingContext from '../context/voting/VotingContext';
import toast, { Toaster } from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/CreateElection.module.css';

const CreateElection = ({ setCreateElection }: any) => {
	const votingContext = useContext(VotingContext);
	const { createElection, contract } = votingContext;

	const [loading, setLoading] = useState(false);

	const [name, setName] = useState('');
	const [position, setPosition] = useState('');

	const handleSubmit = async () => {
		if (name === '' || position === '') {
			return toast.error('All fields are required');
		}
		setLoading(true);
		try {
			await createElection(contract, name, position, uuidv4());
			toast.success('Election created');
		} catch (error) {
			toast.error((error as Error).message);
		}
		setLoading(false);
		setCreateElection(false);
	};

	return (
		<div className={styles.container}>
			<Toaster position='top-right' />
			<div className={styles.close_icon_container}>
				<AiOutlineClose onClick={() => setCreateElection(false)} />
			</div>
			<div className=''>
				<div>
					<label className={styles.labelContainer} htmlFor=''>
						Election Name
					</label>
					<input
						type='text'
						className={styles.inputClass}
						placeholder='election name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div>
					<label className={styles.labelContainer} htmlFor=''>
						Election Position
					</label>
					<input
						type='text'
						className={styles.inputClass}
						placeholder='election position'
						value={position}
						onChange={e => setPosition(e.target.value)}
					/>
				</div>
				<button onClick={() => handleSubmit()} className={styles.buttonClass}>
					{loading ? (
						<>
							<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
							<span className='ml-2'> Creating...</span>
						</>
					) : (
						<>Create Election</>
					)}
				</button>
			</div>
		</div>
	);
};

export default CreateElection;
