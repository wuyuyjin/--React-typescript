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
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import ky from 'ky';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import * as zod from 'zod';
import api from '../API';

// 制定验证规则
const userRules = zod.object({
  userId: zod.string().email({ message: 'email格式注意需要带@' }),
  password: zod.string().min(6, '密码需要输入6位').max(15, '密码最长15位'),
});
// 声明类型
type FormTypes = zod.infer<typeof userRules>;

// 定义函数组件
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({
    resolver: zodResolver(userRules),
  });
  // 定义 SWR 的 key
  const swrKey = api + 'User/login';

  // 使用 SWR hook 缓存和获取数据
  const { error, isLoading } = useSWR(swrKey, { method: 'POST' }, ky);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const navigate = useNavigate();
  // 修改 onSubmit 函数来添加 5 秒的延迟
  const onSubmit = async (data: FormTypes) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 5000)); // 添加 5 秒的延迟
      await ky.post(swrKey, { json: data }).json(); //useSWR 默认会发送 GET 请求
      navigate('/register');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Center>
      <Card className="w-400 h-200 mt-36 rounded-md border-solid border-2 border-indigo-600 ">
        <CardHeader>
          <Heading size="md" textAlign="center">
            TalkSpace登录
          </Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={8}>
              <FormControl>
                <Input {...register('userId')} placeholder="email" type="email" />
                <Text fontSize="xs" color="tomato">
                  {errors.userId?.message}
                </Text>
              </FormControl>
              <FormControl>
                <Input {...register('password')} placeholder="password" type="password" />
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
            <Link color="teal.500" href={`/register`}>
              注册
            </Link>
            <Link color="teal.500" href={`/forget-password`}>
              忘记密码？
            </Link>
          </HStack>
        </CardFooter>
      </Card>
    </Center>
  );
};
export default Login;
