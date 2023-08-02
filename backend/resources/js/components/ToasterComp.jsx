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
                duration: 20000,
                style: {
                    fontSize: 16,
                    background: 'white',
                    color: 'black',
                    width: 400,
                    height: 50,
                    fontFamily: '游ゴシック',
                    fontWeight: 'bold',
                },

                success: {
                    duration: 2000,
                },
                error: {
                    duration: 3000,
                },
            }}
        />
    );
};
export default ToasterComp;
