import { cyan, generate, green, presetPalettes, red } from "@ant-design/colors";
import { Col, ColorPicker, ColorPickerProps, Divider, Row, theme } from "antd";

type Presets = Required<ColorPickerProps>["presets"][number];

function genPresets(presets = presetPalettes) {
      return Object.entries(presets).map<Presets>(([label, colors]) => ({ label, colors, key: label }));
}
const ButtonPickerColor = ({
      onChange,
      defaultColor,
      disabled,
      open,
      ...rest
}: {
      onChange: (color: string) => void;
      defaultColor: string;
      disabled?: boolean;
      open?: boolean;
      rest?: ColorPickerProps;
}) => {
      const { token } = theme.useToken();

      const presets = genPresets({
            primary: generate(token.colorPrimary),
            red,
            green,
            cyan,
      });

      const customPanelRender: ColorPickerProps["panelRender"] = (_, { components: { Picker, Presets } }) => (
            <Row justify="space-between" wrap={false}>
                  <Col span={12}>
                        <Presets />
                  </Col>
                  <Divider type="vertical" style={{ height: "auto" }} />
                  <Col flex="auto">
                        <Picker />
                  </Col>
            </Row>
      );

      return (
            <ColorPicker
                  disabled={disabled || false}
                  onChange={(info, color) => onChange(color)}
                  defaultValue={defaultColor || token.colorPrimary}
                  styles={{ popupOverlayInner: { width: 480 } }}
                  presets={presets}
                  panelRender={customPanelRender}
                  {...rest}
            />
      );
};

export default ButtonPickerColor;
