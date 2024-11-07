/* eslint-disable react-hooks/exhaustive-deps */
import { GameButton } from "../../shared/components/GameButton";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../../shared/router/router.path";
import { Logo } from "../../shared/components/Logo";
import * as S from "./styles";
import { Content } from "../../shared/components/Content";
import Wrapper from "../../shared/components/Wrapper";
import { TextField } from "../../shared/components/TextField";
import { useEffect, useState } from "react";
import { CreateUserType, LoginType } from "../../@types/app.types";
import { UserStore } from "../../shared/store/user.store";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { CircleFlag } from "react-circle-flags";
import { CircleLoader } from "react-spinners";
import { setAuthentication } from "../../shared/security/authentication";

export default function LoginPage() {
  const [loginData, setLoginData] = useState<LoginType>();
  const [createData, setCreateData] = useState<CreateUserType>();
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const userStore = new UserStore();

  useEffect(() => {
    setLoginData({});
    setCreateData({});
  }, [isCreate]);

  const navigate = useNavigate();

  let schemaLogin = object({
    email: string().required().email(),
    password: string().required().min(8).max(20),
  });

  let schemaCreate = object({
    name: string().required().min(2).max(50),
    email: string().required().email(),
    password: string().required().min(8).max(20),
    language: string().required().length(4),
  });

  const signInHandler = async () => {
    if (!loginData) return;
    setLoading(true);

    try {
      schemaLogin.validateSync(loginData);
      const result = await userStore.signIn(loginData);
      if (!result || !result.accessToken) throw new Error("Invalid token!");

      setAuthentication(result?.accessToken);
      navigate(ROUTER_PATHS.Home);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const createUserHandler = async () => {
    if (!createData) return;
    setLoading(true);

    try {
      schemaCreate.validateSync(createData);
      await userStore.createUser(createData);
      setIsCreate(false);
      toast.success("Usuário criado com sucesso!");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content>
      <S.Content>
        <Logo />
        {!isCreate ? (
          <>
            <Wrapper
              width="100%"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Wrapper width="30%">
                <TextField
                  placeholder="E-mail"
                  value={loginData?.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e })}
                />
              </Wrapper>
              <Wrapper width="30%">
                <TextField
                  placeholder="Senha"
                  value={loginData?.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e })}
                  minLength={8}
                  maxLength={20}
                  type="password"
                />
              </Wrapper>
            </Wrapper>

            {loading ? (
              <CircleLoader color="#54d440" />
            ) : (
              <GameButton onClick={signInHandler} text="Login" />
            )}

            <S.CreateBtn onClick={() => setIsCreate(!isCreate)}>
              Criar uma conta
            </S.CreateBtn>
          </>
        ) : (
          <>
            <Wrapper
              width="100%"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Wrapper width="30%">
                <TextField
                  placeholder="Nome"
                  value={createData?.name}
                  onChange={(e) => setCreateData({ ...createData, name: e })}
                  minLength={2}
                  maxLength={50}
                />
              </Wrapper>
              <Wrapper width="30%">
                <TextField
                  placeholder="E-mail"
                  value={createData?.email}
                  onChange={(e) => setCreateData({ ...createData, email: e })}
                />
              </Wrapper>
              <Wrapper width="30%">
                <TextField
                  placeholder="Senha"
                  value={createData?.password}
                  onChange={(e) =>
                    setCreateData({ ...createData, password: e })
                  }
                  minLength={8}
                  maxLength={20}
                  type="password"
                />
              </Wrapper>
              <Wrapper
                width="30%"
                alignItems="center"
                justifyContent="center"
                gap="15px"
                margin="0 0 15px 0"
              >
                <S.Language
                  selected={"ptBR" === createData?.language}
                  onClick={() =>
                    setCreateData({ ...createData, language: "ptBR" })
                  }
                >
                  <CircleFlag countryCode="br" height={50} />
                </S.Language>
                <S.Language
                  selected={"enEN" === createData?.language}
                  onClick={() =>
                    setCreateData({ ...createData, language: "enEN" })
                  }
                >
                  <CircleFlag countryCode="us" height={50} />
                </S.Language>
              </Wrapper>
            </Wrapper>
            {loading ? (
              <CircleLoader color="#54d440" />
            ) : (
              <GameButton onClick={createUserHandler} text="Criar" />
            )}
            <S.CreateBtn onClick={() => setIsCreate(!isCreate)}>
              Voltar
            </S.CreateBtn>
          </>
        )}
      </S.Content>
    </Content>
  );
}
