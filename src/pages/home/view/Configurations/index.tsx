/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "../../../../shared/components/Modal";
import { MenuButton } from "../../../../shared/components/MenuButton";
import Wrapper from "../../../../shared/components/Wrapper";
import * as S from "./styles";
import { Tab, TabConfigType } from "../../../../shared/components/Tab";
import { TextField } from "../../../../shared/components/TextField";
import { useEffect, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { SoundType, UpdateUserType } from "../../../../@types/app.types";
import { UserStore } from "../../../../shared/store/user.store";
import { FormControlLabel, Slider, Stack, Switch } from "@mui/material";
import { Icon } from "@iconify/react";
import { SoundStore } from "../../../../shared/store/sound.store";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ConfigurationView(props: Props) {
  const [userConfig, setUserConfig] = useState<UpdateUserType>({});
  const [soundConfig, setSoundConfig] = useState<SoundType>({});
  const [loading, setLoading] = useState(false);

  const userStore = new UserStore();
  const soundStore = new SoundStore();

  useEffect(() => {
    const config = soundStore.getConfig();
    setSoundConfig(config);
  }, [props.isOpen]);

  const handleClear = () => {
    setUserConfig({});
  };

  const schema = object({
    currentPassword: string().required().min(8).max(16),
    newPassword: string().required().min(8).max(16),
    confirmNewPassword: string().required().min(8).max(16),
  });

  const handleSaveUser = async () => {
    setLoading(true);
    try {
      await userStore.update(userConfig);
      handleClear();
      toast.success("Sucesso");
    } catch {
      toast.error("Erro ao salvar");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSound = () => {
    soundStore.setConfig({
      ...soundConfig,
      volume: soundConfig.volume,
    });
    toast.success("Configuração salva");
  };

  const handleReset = () => {
    setSoundConfig(soundStore.getBaseConfig());
  };

  const valid = () => {
    if (!userConfig.currentPassword && !!userConfig.language) return true;
    if (!schema.isValidSync(userConfig)) return false;
    if (userConfig?.newPassword !== userConfig.confirmNewPassword) return false;
    if (userConfig?.newPassword === userConfig.currentPassword) return false;
    return true;
  };

  const close = () => {
    handleClear();
    props.onClose();
  };

  const userComponent = () => {
    return (
      <>
        <Wrapper gap="20px">
          <TextField
            placeholder="Senha atual"
            value={userConfig?.currentPassword}
            onChange={(value) =>
              setUserConfig({ ...userConfig, currentPassword: value })
            }
            type="password"
            minLength={8}
            maxLength={16}
          />
          <TextField
            placeholder="Nova senha"
            value={userConfig?.newPassword}
            onChange={(value) =>
              setUserConfig({ ...userConfig, newPassword: value })
            }
            type="password"
            minLength={8}
            maxLength={16}
          />
          <TextField
            placeholder="Confirmar senha"
            value={userConfig?.confirmNewPassword}
            onChange={(value) =>
              setUserConfig({ ...userConfig, confirmNewPassword: value })
            }
            type="password"
            error={userConfig?.newPassword !== userConfig?.confirmNewPassword}
            minLength={8}
            maxLength={16}
          />
        </Wrapper>
        <Wrapper
          width="100%"
          alignItems="center"
          justifyContent="center"
          gap="15px"
          margin="15px 0"
        >
          <S.Language
            selected={"ptBR" === userConfig?.language}
            onClick={() => setUserConfig({ ...userConfig, language: "ptBR" })}
          >
            <CircleFlag countryCode="br" height={50} />
          </S.Language>
          <S.Language
            selected={"enEN" === userConfig?.language}
            onClick={() => setUserConfig({ ...userConfig, language: "enEN" })}
          >
            <CircleFlag countryCode="us" height={50} />
          </S.Language>
        </Wrapper>
        <Wrapper justifyContent="end" alignItems="end" gap="10px" height="auto">
          <MenuButton
            text="Limpar"
            marginBottom="0px"
            width={150}
            onClick={handleClear}
            loading={loading}
            disabled={loading}
          />
          <MenuButton
            text="Salvar"
            marginBottom="0px"
            width={150}
            onClick={handleSaveUser}
            loading={loading}
            disabled={loading || !valid()}
          />
        </Wrapper>
      </>
    );
  };

  const soundComponent = () => {
    return (
      <>
        <Wrapper
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Wrapper margin="15px 0 0 0">
            <Stack
              spacing={2}
              direction="row"
              sx={{ alignItems: "center", mb: 1 }}
            >
              <Icon icon="lucide:volume-1" fontSize={30} />
              <Wrapper width="200px">
                <Slider
                  size="small"
                  valueLabelDisplay="on"
                  aria-label="Volume"
                  value={(soundConfig?.volume ?? 0) * 100}
                  onChange={(_, newValue) => {
                    const volume = Math.ceil(newValue as number) / 100;

                    setSoundConfig({
                      ...soundConfig,
                      volume,
                    });
                  }}
                />
              </Wrapper>
              <Icon icon="lucide:volume-2" fontSize={30} />
            </Stack>
          </Wrapper>
          <Wrapper>
            <FormControlLabel
              control={
                <Switch
                  checked={soundConfig.enable ?? false}
                  onChange={(e) =>
                    setSoundConfig({ ...soundConfig, enable: e.target.checked })
                  }
                />
              }
              label="Habilitar"
            />
          </Wrapper>
        </Wrapper>
        <Wrapper
          justifyContent="end"
          alignItems="end"
          gap="10px"
          height="auto"
          width="100%"
          margin="30px 0 0 0"
        >
          <MenuButton
            text="Resetar"
            marginBottom="0px"
            width={150}
            onClick={handleReset}
          />
          <MenuButton
            text="Salvar"
            marginBottom="0px"
            width={150}
            onClick={handleSaveSound}
          />
        </Wrapper>
      </>
    );
  };

  const tabsConfig: TabConfigType[] = [
    {
      key: "user",
      name: "Usuário",
      component: userComponent(),
    },
    {
      key: "sound",
      name: "Som",
      component: soundComponent(),
    },
  ];

  return (
    <Modal isOpen={props.isOpen} onClose={close} title="Configurações">
      <Wrapper
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Tab tabs={tabsConfig} />
        <Wrapper
          justifyContent="end"
          alignItems="end"
          gap="10px"
          height="auto"
          margin="70px 0 0 0"
        >
          <MenuButton
            text="Fechar"
            marginBottom="0px"
            width={150}
            onClick={close}
            loading={loading}
            disabled={loading}
          />
        </Wrapper>
      </Wrapper>
    </Modal>
  );
}
