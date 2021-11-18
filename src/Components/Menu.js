import React, { useState } from "react"
import {
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
	NavLink,
	Container,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap'



export const Menu = (props) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen(!isOpen)

	return (
		<div>
			<Container>
				<Navbar
					color="info"
					expand="md"
					dark >
					<NavbarBrand href="/">
						TI Academy
					</NavbarBrand>
					<NavbarToggler onClick={toggle} />
					<Collapse navbar>
						<Nav
							className="me-auto"
							navbar
						>
							<NavItem>
								<NavLink href="/listar-clientes">
									Clientes
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/listar-servicos">
									Serviços
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/listar-pedidos/">
									Pedidos
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/listar-produtos/">
									Produtos
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/listar-compras/">
									Compras
								</NavLink>
							</NavItem>
							
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Itens
								</DropdownToggle>
								<DropdownMenu end>
									<DropdownItem href="/listar-itens-pedidos/">
										Itens dos Pedidos
									</DropdownItem>
									<DropdownItem href="/listar-itens-compras/">
										Itens das Compras
									</DropdownItem>
									
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Collapse>
				</Navbar>
			</Container>
		</div>
	)
}