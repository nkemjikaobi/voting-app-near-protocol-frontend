import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

/**
 * This is a document class that contains meta links for our application
 * @return {void}
 */
class MyDocument extends Document {
	/**
	 *
	 * @return {jsx}
	 */
	render() {
		return (
			<Html>
				<Head>
					<link href='https://fonts.googleapis.com' rel='preconnect' />
					<link href='https://fonts.gstatic.com' rel='preconnect' />
					<link rel='icon' href='/favicon.ico' />
					<link
						href='https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800;900&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<body className='font-nunitoSans box-border bg-[#1E1E1E] text-white'>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
