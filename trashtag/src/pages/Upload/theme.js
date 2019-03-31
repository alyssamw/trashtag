import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            main: '#245629',
        },
        secondary: {
            main: '#e1ede0',
        },
    },
    overrides: {
        MuiButton: {
            root: {
                color: 'white',
                '&:hover': {
                    backgroundColor: '#245629'
                }
            }
        }
    },
    spacing: 5,
});