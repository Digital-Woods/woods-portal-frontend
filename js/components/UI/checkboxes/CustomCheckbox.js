const CustomCheckbox = () => {
    return (
        <div>
            <Select>
                
            <Options>
                <h1 className="py-3 font-[500] text-lg">Client Filter</h1>
                <hr className="py-1"></hr>
                <div className="flex gap-x-3 py-2">
                <p className="text-xs text-secondary cursor-pointer">select all</p>
                <p className="text-xs text-secondary cursor-pointer">clear all</p>
                </div>
            

              <Option>
                <Checkbox  label="Yokshire new housejbbb" />
              </Option>
              <Option>
              <Checkbox  label="Yokshire new house" />
              </Option>
            </Options>
          </Select>
        </div>
    )
}