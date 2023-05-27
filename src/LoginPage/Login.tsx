import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    FormControl,
    HStack,
    Heading,
    Input,
    Text,
    VStack,
} from '@chakra-ui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import ky from 'ky';
import {useForm} from 'react-hook-form';
import * as zod from 'zod';
import api from "../API/API";
import {Link} from "react-router-dom";

interface IFormInputs {
    userId: string;
    password: string;
}

const userInfo = zod.object({
    userId: zod.string().email({message: '请输入email'}),
    password: zod.string().min(6, '密码需要输入6位').max(15, '密码最长15位'),
});

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInputs>({
        resolver: zodResolver(userInfo),
    });

    const onSubmit = async (data: IFormInputs) => {
        const json = await ky
            .post(api + 'User/login', {
                json: {
                    password: data.password,
                    userId: data.userId,
                },
            })
            .json();
        console.log(json);
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
                                <Button mt={12} colorScheme="teal" type="submit">
                                    登录
                                </Button>
                            </Center>
                        </VStack>
                    </form>
                </CardBody>
                <CardFooter>
                    <HStack spacing={60}>
                        <Text color='teal.500'>
                            <Link to="/register">注册</Link>
                        </Text>
                        <Text color='teal.500'>
                            <Link to="/forgetPassword">忘记密码？</Link>
                        </Text>
                    </HStack>
                </CardFooter>
            </Card>
        </Center>
    );
}

export default Login
