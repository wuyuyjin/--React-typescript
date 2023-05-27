import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod"
import {
    Box,
    Button,
    Card,
    CardBody, CardFooter,
    CardHeader,
    Center,
    FormControl,
    Heading, HStack,
    Input,
    Text, VStack
} from "@chakra-ui/react";
// import api from "../API/API";
// import ky from "ky";
import {Link, useNavigate} from "react-router-dom";

interface FormData {
    userId: string,
    password: string,
    newPassword: string,
    code: string,
    userName: string,
    role: string,
}

const userInfo = zod.object({
    userId: zod.string().email({message: '请填入email'}),
    password: zod.string().min(6, "至少需要六位密码哦！").max(15, "密码长度太长了！"),
    newPassword: zod.string().min(6, "至少需要六位密码哦！").max(15, "密码长度太长了！"),
    userName: zod.string().min(1, "请输入姓名"),
    role: zod.string().min(1, "请输入角色"),
}).refine((FormData) => FormData.password === FormData.newPassword, {
    path: ["newPassword"],
    message: "两次的密码不一致哦！"
})

const Register = () => {

    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormData>({
        resolver: zodResolver(userInfo)
    });


    const onSubmit = async (data: FormData) => {
        // try {
        //     const json = await ky.post(api + "User/register", {
        //         json: {
        //             userName: data.userName,
        //             password: data.password,
        //             userId: data.userId,
        //             code: '111111',
        //             role: data.role,
        //         }
        //     }).json();
        //     console.log(data)
        //     // mutate(data1)
        //     console.log(json)
        // } catch (error) {
        //     console.error(error);
        // }
        navigate('/')
        console.log(data)
    }

    return (
        <Center>
            <Card h={600} w={400} mt={16}>
                <CardHeader textAlign="center">
                    <Heading size="md">TalkSpace注册</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={8}>
                            <FormControl>
                                <Input {...register("userId")} type="userId" placeholder="请输入Email"/>
                                <Text fontSize="xs" color="tomato">{errors.userId?.message}</Text>
                            </FormControl>
                            <FormControl>
                                <Input {...register("password")} type="password" placeholder="请输入密码"/>
                                <Text fontSize="xs" color="tomato">{errors.password?.message}</Text>
                            </FormControl>
                            <FormControl>
                                <Input {...register("newPassword")} type="password" placeholder="请重复输入密码"/>
                                <Text fontSize="xs" color="tomato">{errors.newPassword?.message}</Text>
                            </FormControl>
                            <FormControl>
                                <HStack spacing={12}>
                                    <Box>
                                        <Input {...register("userName")} w={40} placeholder="请输入姓名"/>
                                        <Text fontSize="xs" color="tomato">{errors.userName?.message}</Text>
                                    </Box>
                                    <Box>
                                        <Input {...register("role")} w={40} placeholder="请输入你的角色"/>
                                        <Text fontSize="xs" color="tomato">{errors.role?.message}</Text>
                                    </Box>
                                </HStack>
                            </FormControl>
                            <FormControl textAlign="center" mt={24} colorScheme='teal'>
                                <Button type="submit" colorScheme='teal' isLoading={isSubmitting}>注册</Button>
                            </FormControl>
                        </VStack>
                    </form>
                </CardBody>
                <CardFooter>
                    <HStack spacing={60}>
                        <Text color='teal.500'>
                            <Link to='/'>登录</Link>
                        </Text>
                        <Text color='teal.500'>
                            <Link to='/forgetPassword'>忘记密码？</Link>
                        </Text>
                    </HStack>
                </CardFooter>
            </Card>
        </Center>
    )
}

export default Register