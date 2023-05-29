import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    FormControl,
    Heading,
    HStack,
    Input,
    Text, chakra,
    VStack,
} from '@chakra-ui/react';
import {zodResolver} from '@hookform/resolvers/zod';
// import ky from 'ky';
import {useForm} from 'react-hook-form';
import * as zod from 'zod';
import {Link, useNavigate} from "react-router-dom";
import api from "../API/API";
import ky from "ky";

interface IFormInputs {
    userId: string;
    password: string;
}

const ReLink = chakra(Link)

const userInfo = zod.object({
    userId: zod.string().email({message: '请输入email'}),
    password: zod.string().min(6, '密码需要输入6位').max(15, '密码最长15位'),
});

const fetcher = async (url: string, data: IFormInputs) => {
    const response = await ky.post(url, {json: data});
    return response.json();
};

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInputs>({
        resolver: zodResolver(userInfo),
    });

    const navigate = useNavigate()

    const onSubmit = async (data: IFormInputs) => {
        try {
            const response = await fetcher(
                api + 'User/login', data
            );
            console.log('API response:', response);
        } catch (error) {
            console.log('An error occurred:', error);
        }
        navigate('/home')
    };

    return (
        <Center>
            <Card h={450} w={400} mt={36}>
                <CardHeader textAlign="center">
                    <Heading size="md">TalkSpace登录</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={4}>
                            <FormControl>
                                <Input
                                    {...register('userId')}
                                    placeholder="email"
                                    type="email"
                                />
                                <Text fontSize="xs" color="tomato">
                                    {errors.userId?.message}
                                </Text>
                            </FormControl>
                            <FormControl>
                                <Input {...register('password')} placeholder="密码" type="password"/>
                                <Text fontSize="xs" color="tomato">
                                    {errors.password?.message}
                                </Text>
                            </FormControl>
                            <Center>
                                <Button mt={12} w={360} colorScheme="teal" type="submit">
                                    登录
                                </Button>
                            </Center>
                        </VStack>
                    </form>
                </CardBody>
                <CardFooter>
                    <HStack w="100%" justify="space-between">
                        <ReLink color='teal.500' to="/register">注册</ReLink>
                        <ReLink color='teal.500' to="/forgetPassword">忘记密码？</ReLink>
                    </HStack>
                </CardFooter>
            </Card>
        </Center>
    );
}

export default Login
