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
    Input, Link,
    Text, VStack
} from "@chakra-ui/react";
// import axios from "axios";
import api from "../API/API";
import ky from "ky";

// import api from "../API/API";

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
    // code: zod.string().length(6, "需要六位验证码！")
}).refine((FormData) => FormData.password === FormData.newPassword, {
    path: ["newPassword"],
    message: "两次的密码不一致哦！"
})


const Register = () => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormData>({
        resolver: zodResolver(userInfo)
    });

    const onSubmit = (data: FormData) => {
        // axios.post(api + 'User/register', {
        //     userName: data.userName,
        //     password: data.password,
        //     userId: data.userId,
        //     code: '111111',
        //     role: data.role,
        // }).then(response => {
        //     console.log(response)
        // }).catch(errors => {
        //     console.log(errors)
        // })


        const json = ky.post(api+"User/register", {
            headers: {
                'content-type': 'application/json'
            },
            json: {
                userName: data.userName,
                password: data.password,
                userId: data.userId,
                code: '111111',
                role: data.role,
            },
        }).json();

        console.log(json);

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 3000)
        })


        // console.log(data)

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
                                {/*<FormLabel>Email</FormLabel>*/}
                                <Input {...register("userId")} type="userId" placeholder="请输入Email"/>
                                <Text fontSize="xs" color="tomato">{errors.userId?.message}</Text>
                            </FormControl>
                            <FormControl>
                                {/*<FormLabel>密码</FormLabel>*/}
                                <Input {...register("password")} type="password" placeholder="请输入密码"/>
                                <Text fontSize="xs" color="tomato">{errors.password?.message}</Text>
                            </FormControl>
                            <FormControl>
                                {/*<FormLabel>重复密码</FormLabel>*/}
                                <Input {...register("newPassword")} type="password" placeholder="请重复输入密码"/>
                                <Text fontSize="xs" color="tomato">{errors.newPassword?.message}</Text>
                            </FormControl>
                            <FormControl>
                                <HStack spacing={10}>
                                    <Box>
                                        {/*<FormLabel>姓名</FormLabel>*/}
                                        <Input {...register("userName")} w={40} placeholder="请输入姓名"/>
                                        <Text fontSize="xs" color="tomato">{errors.userName?.message}</Text>
                                    </Box>
                                    <Box>
                                        {/*<FormLabel>角色</FormLabel>*/}
                                        <Input {...register("role")} w={40} placeholder="请输入你的角色"/>
                                        <Text fontSize="xs" color="tomato">{errors.role?.message}</Text>
                                    </Box>
                                </HStack>
                            </FormControl>
                            {/*<FormControl>*/}
                            {/*    <FormLabel>验证码</FormLabel>*/}
                            {/*    <HStack spacing={20}>*/}
                            {/*        <Input {...register("code")} w={40} placeholder="请输入六位验证码"/>*/}
                            {/*        <Button type="submit" colorScheme='teal' isLoading={isSubmitting}>发送验证码</Button>*/}
                            {/*    </HStack>*/}
                            {/*    <Text fontSize="xs" color="tomato">{errors.code?.message}</Text>*/}
                            {/*</FormControl>*/}
                            <FormControl textAlign="center" mt={24} colorScheme='teal'>
                                <Button type="submit" colorScheme='teal' isLoading={isSubmitting}>注册</Button>
                            </FormControl>
                        </VStack>
                    </form>
                </CardBody>
                <CardFooter>
                    <HStack spacing={60}>
                        <Link color='teal.500' href='#'>登录</Link>
                        <Link color='teal.500' href='/ForgetPassword'>忘记密码？</Link>
                    </HStack>
                </CardFooter>
            </Card>
        </Center>
    )
}

export default Register