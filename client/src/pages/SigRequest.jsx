import { Container , Box} from '@mui/material/';
import Navbar from '../components/Navbar';

const SigRequest = (userDetails) => {
    const user = userDetails.user;

    return (
        <Container disableGutters maxWidth="false">
            <Box sx={{ bgcolor: 'white', height: '100vh' }} >
                {/* <Navbar user={user} /> */}
                {/* <ResponsiveAppBar/> */}
                SigRequest
                
                {user.firstName}
            </Box>
            {/* ha */}
        </Container>    
    )

}

export default SigRequest;