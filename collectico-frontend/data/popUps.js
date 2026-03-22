import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';

const popups = [
    {
        icon: CheckCircleIcon,
        result: 'Success!',
        message: 'Your account has been created successfully',
        buttonText: 'okay',
        color: 'green',
    },
    {
        icon: CancelIcon,
        result: 'Sorry!',
        message: `Something went wrong. Please try again!`,
        buttonText: 'okay',
        color: 'red',
    },
]

export default popups;