/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Modal } from "../../../../shared/components/Modal";
import { CreateAdventureType } from "../../../../@types/app.types";
import { TextField } from "../../../../shared/components/TextField";
import { MenuButton } from "../../../../shared/components/MenuButton";
import Wrapper from "../../../../shared/components/Wrapper";
import { object, string } from "yup";
import { PvPStore } from "../../../../shared/store/pvp.store";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreatePvPRoomsView(props: Props) {
  const [data, setData] = useState<CreateAdventureType>();

  const pvpStore = new PvPStore();

  let schema = object({
    name: string().required().min(5).max(50),
  });

  const handleCreate = async () => {
    schema.validateSync(data);
    await pvpStore.create(data?.name!);
    close();
  };

  const close = () => {
    props.onClose();
    setData(undefined);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={close} title="Criar sala">
      <Wrapper
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <div>
          <TextField
            placeholder="Nome da sala"
            value={data?.name}
            onChange={(e) => setData({ ...data, name: e })}
            minLength={5}
            maxLength={50}
          />
        </div>

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
          />
          <MenuButton
            text="Criar"
            marginBottom="0px"
            width={150}
            onClick={handleCreate}
            disabled={!schema.isValidSync(data)}
          />
        </Wrapper>
      </Wrapper>
    </Modal>
  );
}
