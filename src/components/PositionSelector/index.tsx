import React from 'react';
import Select from 'react-select';
import { useToggle } from 'react-use';
import { InputGroup, Input, Button } from 'reactstrap';
import { usePositions } from '../../api/position';
import { Company } from '../../api/types/company';
import { JobType } from '../../api/types/position';

type SelectVal = { value: number; label: string };

interface PositionSelectorProps {
  name?: string;
  company: Company;
  onChange: (value: SelectVal) => void;
  newPositionTitle?: string;
  setNewPositionTitle?: (newPositionTitle: string) => void;
  newPositionType?: JobType;
  setNewPositionType?: (newPositionType: JobType) => void;
}

export const PositionSelector: React.FunctionComponent<PositionSelectorProps> = ({
  name,
  onChange,
  company,
  newPositionTitle,
  setNewPositionTitle,
  newPositionType,
  setNewPositionType
}) => {
  const { positions, isLoading } = usePositions(company.id);
  const [createPosition, toggleCreatePosition] = useToggle(
    positions.length == 0
  );

  React.useEffect(() => {
    toggleCreatePosition(positions.length == 0);
  }, [positions, toggleCreatePosition]);

  const positionOptions = positions.map(position => {
    return {
      label: `${position.title}${
        position.job_type === JobType.CO_OP ? ` (Co-Op)` : ' (Fulltime)'
      }`,
      value: position.id
    };
  });

  if (positionOptions.length >= 1 && !createPosition) {
    return (
      <>
        <Select
          name={name}
          options={positionOptions}
          isLoading={isLoading}
          onChange={value => onChange(value as SelectVal)}
        />
        <p style={{ textAlign: 'center', flex: 'auto' }}>
          Don't see the position you're looking for?{' '}
          <Button color="link" onClick={toggleCreatePosition} size={'sm'}>
            Add it!
          </Button>
        </p>
      </>
    );
  } else if (setNewPositionTitle && setNewPositionType) {
    return (
      <InputGroup>
        <Input
          value={newPositionTitle}
          onChange={event => setNewPositionTitle(event.target.value)}
        />
        <Input
          type={'select'}
          name={'newPositionTypeSelector'}
          id={'newPositionTypeSelector'}
          value={newPositionType}
          defaultValue={newPositionType ?? JobType.CO_OP}
        >
          <option
            value={JobType.CO_OP}
            onSelect={() => setNewPositionType(JobType.CO_OP)}
          >
            Co-Op/Internship
          </option>
          <option
            value={JobType.FULL_TIME}
            onSelect={() => setNewPositionType(JobType.FULL_TIME)}
          >
            FullTime
          </option>
        </Input>
      </InputGroup>
    );
  } else {
    return null;
  }
};