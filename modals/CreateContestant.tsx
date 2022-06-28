import React, { useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import VotingContext from '../context/voting/VotingContext';
import toast, { Toaster } from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import styles from '../styles/CreateElection.module.css';


const CreateContestant = ({ setCreateContestant, electionId }: any) => {
	const votingContext = useContext(VotingContext);
	const { addContestant, contract } = votingContext;

	const [loading, setLoading] = useState(false);

	const [name, setName] = useState('');
	const [bio, setBio] = useState('');

	const handleSubmit = async () => {
		if (name === '' || bio === '') {
			return toast.error('All fields are required');
		}
		setLoading(true);
		try {
			await addContestant(contract, name, bio, 0, electionId);
			toast.success('Contestant added');
		} catch (error) {
			toast.error((error as Error).message);
		}
		setLoading(false);
		setCreateContestant(false);
	};

	return (
		<div className={styles.container}>
			<Toaster position='top-right' />
			<div className={styles.close_icon_container}>
				<AiOutlineClose onClick={() => setCreateContestant(false)} />
			</div>
			<div className=''>
				<div>
					<label className={styles.labelContainer} htmlFor=''>
						Contesant Name
					</label>
					<input
						type='text'
						className={styles.inputClass}
						placeholder='contestant name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div>
					<label className={styles.labelContainer} htmlFor=''>
						Contesant Bio
					</label>
					<input
						type='text'
						className={styles.inputClass}
						placeholder='contestant bio'
						value={bio}
						onChange={e => setBio(e.target.value)}
					/>
				</div>
				<button onClick={() => handleSubmit()} className={styles.buttonClass}>
					{loading ? (
						<>
							<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
							<span className='ml-2'> Creating...</span>
						</>
					) : (
						<>Create Contestant</>
					)}
				</button>
			</div>
		</div>
	);
};

export default CreateContestant;
