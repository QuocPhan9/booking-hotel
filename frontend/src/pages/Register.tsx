import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContextUtils';
import { useNavigate } from 'react-router-dom';

export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const Register = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const { 
        register, 
        watch, 
        handleSubmit, 
        formState: {errors}
    } = useForm<RegisterFormData>();

    const mutation = useMutation({
        mutationFn: apiClient.register,
        onSuccess: () => {
            showToast({message: "Registration Success!", type: "SUCCESS" });
            navigate("/")
        },
        onError: (errors: Error) => {
            showToast({ message: errors.message , type: "ERROR" });

        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">
                        Sign Up
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Create your account to get started
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                placeholder="First Name"
                                {...register("firstName", {required:"This is field is required"})}
                            />
                            {errors.firstName && (
                                <span className='text-red-500'>{errors.firstName.message}</span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                placeholder="Last Name"
                                {...register("lastName", {required:"This is field is required"})}
                            />
                            {errors.lastName && (
                                <span className='text-red-500'>{errors.lastName.message}</span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                placeholder="Email address"
                                {...register("email", {required:"This is field is required"})}
                            />
                            {errors.email && (
                                <span className='text-red-500'>{errors.email.message}</span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                placeholder="Password"
                                {...register("password", {
                                    required:"This is field is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at leasts 6 characters",
                                    }
                                })}
                            />
                            {errors.password && (
                                <span className='text-red-500'>{errors.password.message}</span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                placeholder="Confirm Password"
                                {...register("confirmPassword", {
                                    validate:(val) => {
                                        if(!val) {
                                            return "This field is required";
                                        } else if(watch("password") !== val) {
                                            return "Your passwords do no match";
                                        }
                                    }
                                })}
                            />
                            {errors.confirmPassword && (
                                <span className='text-red-500'>{errors.confirmPassword.message}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Register;
