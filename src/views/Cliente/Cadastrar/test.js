export const Dropdown = () =>{
    <div
  style={{
    border: '1px solid #000',
    height: 100,
    overflow: 'hidden',
    padding: '8px',
    width: 300
  }}
>
  Container with overflow: hidden.
  <br />
  Last clicked: 3
  <Dropdown toggle={function noRefCheck(){}}>
    <DropdownToggle caret>
      Dropdown
    </DropdownToggle>
    <DropdownMenu container="body">
      <DropdownItem onClick={function noRefCheck(){}}>
        Action 1
      </DropdownItem>
      <DropdownItem onClick={function noRefCheck(){}}>
        Action 2
      </DropdownItem>
      <DropdownItem onClick={function noRefCheck(){}}>
        Action 3
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</div>
}