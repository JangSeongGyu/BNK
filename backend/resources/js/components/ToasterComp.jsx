import toast, { Toaster } from 'react-hot-toast';

const ToasterComp = (props) => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                    background: 'black',
                    color: 'white',
                    width: 500,
                    height: 70,
                },

                // Default options for specific types
                // success: {
                //     duration: 3000,
                // },
            }}
        />
    );
};
export default ToasterComp;
