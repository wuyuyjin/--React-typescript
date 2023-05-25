import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const ForgetPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = values => {
    return new Promise(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  };

  return (
    <Center>
      <Card h={500} w={400} mt={36} textAlign="center">
        <CardHeader>
          <Heading size="md">TalkSpace注册</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">email</FormLabel>
              <Input
                id="email"
                placeholder="email"
                type="email"
                {...register('email', {
                  required: '请输入正确的Email',
                  minLength: { value: 4, message: 'Email' },
                })}
              />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">password</FormLabel>
              <Input
                id="password"
                placeholder="password"
                type="password"
                {...register('password', {
                  required: '请输入密码',
                  minLength: { value: 6, message: '密码需要输入6位' },
                })}
              />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.newPassword}>
              <FormLabel htmlFor="newPassword">newPassword</FormLabel>
              <Input
                id="newPassword"
                placeholder="newPassword"
                type="password"
                {...register('newPassword', {
                  required: '请确认密码',
                  minLength: { value: 6, message: '密码需要输入6位' },
                })}
              />

              {/* <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage> */}
            </FormControl>
            <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit" marginTop={12}>
              Submit
            </Button>
          </form>
        </CardBody>
        <CardFooter>
          <HStack spacing={30}>
            <Link>登录</Link>
            <Link>忘记密码？</Link>
          </HStack>
        </CardFooter>
      </Card>
    </Center>
  );
};

export default ForgetPassword;
