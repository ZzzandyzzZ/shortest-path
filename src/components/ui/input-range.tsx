interface Props {
  textLabel: string
  initalValue: number
  maxValue: number
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const minValue = 4 // We want a 4x4 min grid size

export const InputRange = ({ textLabel, initalValue, handleChange, maxValue }: Props) => {
  return (
    <label className="text-center bg-lazuli-500 rounded-full px-5 py-2.5">
      {textLabel}: {initalValue}
      <div className='flex items-center gap-2'>
        {minValue}
        <input
          id="steps-range"
          type="range"
          min={minValue}
          max={maxValue}
          value={initalValue}
          step="2"
          onChange={handleChange}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-lazuli-900"
        />
        {maxValue}
      </div>
    </label>
  )
}
