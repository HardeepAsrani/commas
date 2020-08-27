/**
 * Internal dependencies.
 */
const { apiFetch } = wp;

const { __ } = wp.i18n;

const { serialize } = wp.blocks;

const {
	BlockControls,
	InnerBlocks,
	InspectorControls
} = wp.blockEditor;

const {
	Button,
	PanelBody,
	Placeholder,
	SelectControl,
	Spinner,
	Toolbar,
	ToolbarButton
} = wp.components;

const {
	useSelect,
	useDispatch
} = wp.data;

const { useState } = wp.element;

const Edit = ({
	clientId
}) => {
	const selectedBlock = useSelect( select => {
		const { getBlock } = select( 'core/block-editor' );
		const selectedBlock = serialize( getBlock( clientId ) );
		return selectedBlock;
	});

	const { createNotice } = useDispatch( 'core/notices' );

	const [ isLoading, setLoading ] = useState( false );
	const [ results, setResults ] = useState([]);

	const proofreadRequest = async() => {
		setLoading( true );
		setResults([]);

		const content = selectedBlock.replace( /<\!--.*?-->/g, '' );

		try {
			let data = await apiFetch({
				path: 'commas/v1/check',
				method: 'POST',
				data: { content }
			});
			data = JSON.parse( data );

			if ( data.message ) {
				createNotice(
					'error',
					data.message,
					{
						type: 'snackbar'
					}
				);
			} else if ( data.matches ) {
				setResults( data.matches );
			}
		} catch ( error ) {
			createNotice(
				'error',
				error.message ? error.message : __( 'There was an undefined error.' ),
				{
					type: 'snackbar'
				}
			);
		}

		setLoading( false );
	};

	return (
		<>
			<BlockControls>
				<Toolbar>
					<ToolbarButton
						icon="editor-spellcheck"
						label={ __( 'Proofread' ) }
						onClick={ proofreadRequest }
					/>
				</Toolbar>
			</BlockControls>

			<InspectorControls>
				{ results.map( result => (
					<PanelBody
						title={ result.shortMessage || result.message }
						initialOpen={ false }
					>
						{ result.message && (
							<div
								style={{
									padding: '5px'
								}}
							>
								<strong>{ __( 'Explanation: ' ) }</strong>
								{ result.message }
							</div>
						) }

						{ result.sentence && (
							<div
								style={{
									padding: '5px'
								}}
							>
								<strong>{ __( 'Sentence: ' ) }</strong>
								"{ result.sentence }"
							</div>
						) }

						{ result.replacements && 0 < result.replacements.length && (
							<SelectControl
								label={ __( 'Possible Replacements' ) }
								options={ result.replacements.map( replacement => (
									{
										value: replacement.value,
										label: replacement.value
									}
								) ) }
							/>
						) }
					</PanelBody>
				) ) }

				<PanelBody>
					{ isLoading ? (
						<Placeholder>
							<Spinner/>
						</Placeholder>
					) : (
						<Button
							isPrimary
							onClick={ proofreadRequest }
						>
							{ __( 'Proofread' ) }
						</Button>
					) }
				</PanelBody>
			</InspectorControls>

			<InnerBlocks
				templateLock={ false }
				template={ [ [ 'core/paragraph' ] ] }
			/>
		</>
	);
};

export default Edit;
