import { storiesOf } from "@storybook/react";
import { Button } from "../../core/src";

const Gallery = () => (
	<div className="flex">
		<Button highlight children="Button" />
		<Button children="Button" />
	</div>
);

storiesOf("Gallery", module).add("Main", Gallery);
