import { Input } from "@/app/(app)/body-comp/input.component";
import { Button } from "@/components/button/button.component";
import { Header } from "@/components/header/header.component";
import { Option } from "@/components/select/option.component";
import { Select } from "@/components/select/select.component";
import { ReactNode } from "react";

export default function OnboardingPage() {
  return (
    <>
      <Header title="Welcome" />

      <form>
        <main className="flex flex-col gap-6 px-4 mt-6">
          <Input
            id="txtBirthday"
            defaultValue={"2000-01-01"}
            label="Birthday"
            name="birthday"
            required
            type="date"
          />

          <Select id="ddlSex" label="Sex" name="sex" required>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>

          <Select id="ddlHeight" label="Height" name="height" required>
            {renderHeightOptions()}
          </Select>
        </main>

        <footer className="bg-(--background) border-t border-t-gray-400 bottom-0 fixed flex gap-3 inset-x-0 justify-stretch p-4">
          <Button type="submit">Proceed</Button>
        </footer>
      </form>
    </>
  );
}

const renderHeightOptions = () => {
  const options: ReactNode[] = [];

  for (let i = 60; i <= 84; i += 0.5) {
    const feet = Math.floor(i / 12);
    const inches = i % 12;

    options.push(
      <Option key={i} value={`${feet}ft${inches}`}>
        {`${feet} feet ${inches} inches`}
      </Option>
    );
  }

  return options;
};
