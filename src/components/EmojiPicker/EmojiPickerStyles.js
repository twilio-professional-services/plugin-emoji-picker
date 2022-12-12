import { styled } from '@twilio/flex-ui';

export const EmojiWrapper = styled('div')`
position:relative;
display:flex;
flex:0 0 auto;

button {
	background:none;
	border:none;
	border-radius:50%;
	color:inherit;
	cursor:pointer;
	width:2.25rem;
	height:2.25rem;
	padding:8px;
	transition:background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

button:hover {
	background:rgb(225, 227, 234);
}

button:disabled {
	opacity:0.4;
	cursor:not-allowed;
}

button svg {
	fill:currentColor;
}
`;