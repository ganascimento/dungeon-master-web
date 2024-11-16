import { Modal } from "../../../../shared/components/Modal";
import { MenuButton } from "../../../../shared/components/MenuButton";
import Wrapper from "../../../../shared/components/Wrapper";
import * as S from "./styles";
import { Icon } from "@iconify/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function InformationView(props: Props) {
  const close = () => {
    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={close} title="Informações">
      <Wrapper
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <S.Content>
          <div className="title">Distribuição de pontos</div>
          <ul>
            <li>
              Pontos em força, concedem bonus nas habilidades corpo a corpo;
            </li>
            <li>
              Pontos em destreza, concedem bonus nas habilidades a distância e
              também na iniciativa do combate;
            </li>
            <li>
              Pontos em constituição, concedem bonus nas skills de cura, como
              também na vida máxima e na classe de armadura;
            </li>
            <li>
              Pontos em inteligência, concedem bonus nas habilidades de magicas;
            </li>
          </ul>

          <div className="title">Regras de combate</div>
          <ul>
            <li>
              Habilidades de distância, quando usadas corpo a corpo, tem
              desvantagem, a não ser que seja uma skill em area;
            </li>
            <li>
              Magias não tem uma rolagem de ataque, mas são resistidas pelo
              inimigo. Existe um simbolo de escudo{" "}
              <Icon icon="material-symbols:shield" /> nas magias, eles demontram
              qual a rolagem de resistencia que o inimigo tem que superar para
              não levar dano da magia;
            </li>
            <li>
              Se você flanquear um oponente, você tem vantagem em ataques corpo
              a corpo;
            </li>
            <li>Mágias em area também podem afetar você ou seus aliados;</li>
          </ul>

          <div className="title">Icones</div>
          <ul>
            <li>
              <Icon icon="simple-line-icons:energy" /> Custo de stamina
            </li>
            <li>
              <Icon icon="typcn:time" /> Turnos de espera após utilizar
            </li>
            <li>
              <Icon icon="material-symbols-light:arrow-range" /> Distância em
              quadros
            </li>
            <li>
              <Icon icon="material-symbols-light:target" /> Quantidade de alvos
            </li>
            <li>
              <Icon icon="carbon:area" /> Area de efeito
            </li>
            <li>
              <Icon icon="material-symbols:shield" /> Resistência mágica
            </li>
          </ul>
        </S.Content>
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
        </Wrapper>
      </Wrapper>
    </Modal>
  );
}
