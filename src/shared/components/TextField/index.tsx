import * as S from "./styles";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
};

export const TextField = (props: Props) => {
  const validCounter = () => {
    if (props.minLength && !!props.value) {
      if (props.value && props.value.length < props.minLength) return "error";
      else return "success";
    }
  };

  const onChange = (value: string) => {
    if (props.maxLength && !!value && value.length > props.maxLength) return;
    props.onChange(value);
  };

  return (
    <S.Content>
      <S.Input
        type="text"
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {props.maxLength ? (
        <S.Counter status={validCounter()}>
          {props.value?.length ?? 0}/{props.maxLength}
        </S.Counter>
      ) : (
        <></>
      )}
    </S.Content>
  );
};
