interface Props {
  textLabel: string
  initalValue: number
  maxValue: number
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputRange = ({ textLabel, initalValue, handleChange, maxValue }: Props) => {
  return (
    <div>
      <label htmlFor="steps-range" className="block mb-2 text-sm">{textLabel}</label>
      <input
        id="steps-range"
        type="range"
        min="4"
        max={maxValue}
        value={initalValue}
        step="2"
        onChange={handleChange}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer" />
    </div>
  )
}
