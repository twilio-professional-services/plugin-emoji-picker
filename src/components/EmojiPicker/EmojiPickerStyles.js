import styled from 'react-emotion';

export const EmojiWrapper = styled('div')`
position:relative;
display:flex;
flex:0 0 auto;
width:2.25rem;
height:2.25rem;
padding:5px;

button {
	background:none;
	border:none;
	cursor:pointer;
}

button:disabled {
	opacity: 0.4;
	cursor: not-allowed;
}
`;