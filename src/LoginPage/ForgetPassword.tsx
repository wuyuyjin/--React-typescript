import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod"
import {
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
import ky from "ky";
import api from "../API/API";

interface FormData {
    userId: string,
    password: string,
    newPassword: string,
    code: string
}

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
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(userInfo)
    });

    const onSubmit = (data: FormData) => {
        const json = ky.get(api+'User/register',
            {
                json: {
                    userId: data.userId,
                    code: '1111',
                    newPassword: data.newPassword
                },
            }).json();

        console.log(json)

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 3000)
        })
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
                        <FormControl textAlign="center" mt={12} colorScheme='teal'>
                            <Button type="submit" colorScheme='teal'>找回密码</Button>
                        </FormControl>
                        </VStack>
                    </form>
                </CardBody>
                <CardFooter>
                    <HStack spacing={72}>
                        <Link color='teal.500' href='/'>登录</Link>
                        <Link color='teal.500' href='/Register'>注册</Link>
                    </HStack>
                </CardFooter>
            </Card>
        </Center>
    )
}

export default ForgetPassword