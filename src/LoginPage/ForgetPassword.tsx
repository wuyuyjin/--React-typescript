import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod"
import {
    Button,
    Card,
    CardBody, CardFooter,
    CardHeader,
    Center, chakra,
    FormControl,
    Heading, HStack,
    Input,
    Text, VStack
} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import ky from "ky";
import api from "../API/API";

interface FormData {
    userId: string,
    password: string,
    newPassword: string,
    code: string
}

const ReLink = chakra(Link)

const userInfo = zod.object({
    userId: zod.string().email({message: '请填入email'}),
    password: zod.string().min(6, "至少需要六位密码哦！").max(15, "密码长度太长了！"),
    newPassword: zod.string().min(6, "至少需要六位密码哦！").max(15, "密码长度太长了！"),
    code: zod.string().length(6, "需要六位验证码！")
}).refine((FormData) => FormData.password === FormData.newPassword, {
    path: ["newPassword"],
    message: "两次的密码不一致哦！"
})

const ForgetPassword = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(userInfo)
    });

    const onSubmit = async (data: FormData) => {
        const json = ky.get(api + 'User/register',
            {
                json: {
                    userId: data.userId,
                    code: '1111',
                    newPassword: data.newPassword
                },
            }).json();
        console.log(json)
        navigate('/')
        console.log(data)
    }


    return (
        <Center>
            <Card h={600} w={400} mt={16}>
                <CardHeader textAlign="center">
                    <Heading size="md">忘记密码？</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={8}>
                            <FormControl>
                                <Input {...register("userId")} type="email" placeholder="请输入Email"/>
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
                            <Center>
                                <Button mt={12} w={360} type="submit" colorScheme='teal'>找回密码</Button>
                            </Center>
                        </VStack>
                    </form>
                </CardBody>
                <CardFooter>
                    <HStack w="100%" justify="space-between">
                            <ReLink color='teal.500' to='/'>登录</ReLink>
                            <ReLink color='teal.500' to='/register'>注册</ReLink>
                    </HStack>
                </CardFooter>
            </Card>
        </Center>
    )
}

export default ForgetPassword