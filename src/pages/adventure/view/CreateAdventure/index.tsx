import { useContext, useState } from "react";
import { Modal } from "../../../../shared/components/Modal";
import { AdventureType } from "../../../../@types/app.types";
import { TextField } from "../../../../shared/components/TextField";
import { TextArea } from "../../../../shared/components/TextArea";
import { MenuButton } from "../../../../shared/components/MenuButton";
import Wrapper from "../../../../shared/components/Wrapper";
import { object, string } from "yup";
import { TalkStore } from "../../../../shared/store/talk.store";
import LoadingContext from "../../../../shared/context/LoaderContext";
import { AdventureStore } from "../../../../shared/store/adventure.store";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setAdventures: (value: AdventureType[] | undefined) => void;
};

export default function CreateAdventureView(props: Props) {
  const [data, setData] = useState<AdventureType>();
  const [, setLoading] = useContext(LoadingContext);

  const talkStore = new TalkStore();
  const adventureStore = new AdventureStore();

  let schema = object({
    name: string().required().min(5).max(50),
    description: string().required().min(20).max(100),
    plot: string().required().min(500).max(3000),
  });

  const handleCreate = async () => {
    if (!data) return;
    setLoading(true);
    try {
      schema.validateSync(data);
      await adventureStore.create(data);
      const result = await adventureStore.getAll();
      props.setAdventures(result);
      setData({});
      props.onClose();
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleGetPlot = async () => {
    if (!data || !data.description) return;

    setLoading(true);
    try {
      const result = await talkStore.getPlot(data?.description);
      setData({ ...data, plot: result });
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Vamos criar uma nova campanha"
    >
      <Wrapper
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <div>
          <TextField
            placeholder="Nome da campanha"
            value={data?.name}
            onChange={(e) => setData({ ...data, name: e })}
            minLength={10}
            maxLength={50}
          />
          <TextArea
            placeholder="Resumo da campanha (poderá ser usado para gerar um enredo)"
            value={data?.description}
            onChange={(e) => setData({ ...data, description: e })}
            minLength={20}
            maxLength={120}
            rows={3}
          />
          <TextArea
            placeholder="Enredo"
            value={data?.plot}
            onChange={(e) => setData({ ...data, plot: e })}
            minLength={500}
            maxLength={6000}
          />
        </div>
        <Wrapper
          justifyContent="end"
          alignItems="end"
          gap="10px"
          height="auto"
          margin="30px 0 0 0"
        >
          <MenuButton
            text="Gerar enredo"
            marginBottom="0px"
            width={200}
            title="Gera o enredo com base na descrição informada"
            disabled={!data?.description || data.description.length < 20}
            onClick={handleGetPlot}
          />
          <MenuButton
            text="Criar"
            marginBottom="0px"
            width={150}
            onClick={handleCreate}
          />
        </Wrapper>
      </Wrapper>
    </Modal>
  );
}
