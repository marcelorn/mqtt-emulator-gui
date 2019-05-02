import React from 'react';
import PropTypes from 'prop-types';

import { Form, FormSection, FormInput } from '../components';

function Forms(props) {

	const {
		classes,
	} = props;

	return (
		<Form>

			<FormInput
				label="Detalhes do caso" 
			/>

			<FormSection label="Pessoa">
				<FormInput
					label="Nome"
				/>
				<FormInput
					label="Apelido"
					required
				/>
			</FormSection>

		</Form>
	);
}

export default Forms;
