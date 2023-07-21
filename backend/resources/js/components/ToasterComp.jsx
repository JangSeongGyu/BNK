import toast, { Toaster } from 'react-hot-toast';

const ToasterComp = (props) => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                    fontSize: 16,
                    background: 'white',
                    color: 'black',
                    width: 400,
                    height: 50,
                },

                success: {
                    duration: 2000,
                },
                error: {
                    duration: 2000,
                },
            }}
        />
    );
};
export default ToasterComp;
