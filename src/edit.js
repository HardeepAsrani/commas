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
	Spinner,
	TextControl,
	Toolbar,
	ToolbarButton
} = wp.components;

const {
	useSelect,
	useDispatch
} = wp.data;

const {
	useEffect,
	useState
} = wp.element;

const Edit = ({
	clientId
}) => {
	const selectedBlock = useSelect( select => {
		const { getBlock } = select( 'core/block-editor' );
		const selectedBlock = serialize( getBlock( clientId ) );
		return selectedBlock;
	});

	const { createNotice } = useDispatch( 'core/notices' );

	useEffect( async() => {
		let model;

		await wp.api.loadPromise.then( () => {
			model = new wp.api.models.Settings();
		});

		if ( false === isAPILoaded ) {
			model.fetch().then( response => {
				if ( '' !== response.commas_api ) {
					setAPI( response.commas_api );
				}
				setAPILoaded( true );
			});
		}
	}, []);

	const [ isLoading, setLoading ] = useState( false );
	const [ isAPILoaded, setAPILoaded ] = useState( false );
	const [ API, setAPI ] = useState( null );
	const [ results, setResults ] = useState([]);

	const proofreadRequest = async() => {
		setLoading( true );
		setResults([]);

		const content = selectedBlock.replace( /<\!--.*?-->/g, '' );

		try {
			let data = await apiFetch({
				path: 'commas/v1/check',
				method: 'POST',
				data: {
					content,
					api: API
				}
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

	const changeAPI = async() => {
		setLoading( true );
		const model = new wp.api.models.Settings({
			// eslint-disable-next-line camelcase
			commas_api: API
		});

		await model.save();
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
					</PanelBody>
				) ) }

				{ isLoading ? (
					<PanelBody>
						<Placeholder>
							<Spinner/>
						</Placeholder>
					</PanelBody>
				) : (
					<>
						<PanelBody>
							<Button
								isPrimary
								onClick={ proofreadRequest }
							>
								{ __( 'Proofread' ) }
							</Button>
						</PanelBody>

						<PanelBody>
							<TextControl
								label={ __( 'GrammarBot API' ) }
								disabled={ isLoading }
								value={ API }
								onChange={ setAPI }
							/>

							<Button
								isPrimary
								isBusy={ isLoading }
								onClick={ changeAPI }
							>
								{ __( 'Save API' ) }
							</Button>
						</PanelBody>
					</>
				) }

			</InspectorControls>

			<InnerBlocks
				templateLock={ false }
				template={ [ [ 'core/paragraph' ] ] }
			/>
		</>
	);
};

export default Edit;
