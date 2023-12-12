import { MAX_NUMBER_ROW } from '../../constants'

interface Props {
  textLabel: string
  initalValue: number
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputRange = ({ textLabel, initalValue, handleChange }: Props) => {
  return (
    <div>
      <label htmlFor="steps-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{textLabel}</label>
      <input
        id="steps-range"
        type="range"
        min="4"
        max={MAX_NUMBER_ROW}
        value={initalValue}
        step="2"
        onChange={handleChange}
        className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer" />
    </div>
  )
}
