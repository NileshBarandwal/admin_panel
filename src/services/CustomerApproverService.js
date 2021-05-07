const KEYS = {
    CustomerApprovers: 'CustomerApprovers',
    CustomerApproverId: 'CustomerApproverId'
}

export const getofficetypeCollection = () => ([
    { id: '1', title: 'HO' },
    { id: '2', title: 'Branch Office' },
])

export function insertCustomerApprover(data) {
    let CustomerApprovers = getAllCustomerApprovers();
    data['id'] = generateCustomerApproverId()
    CustomerApprovers.push(data)
    localStorage.setItem(KEYS.CustomerApprovers, JSON.stringify(CustomerApprovers))
}

export function updateCustomerApprover(data) {
    let CustomerApprovers = getAllCustomerApprovers();
    let recordIndex = CustomerApprovers.findIndex(x => x.id === data.id);
    CustomerApprovers[recordIndex] = { ...data }
    localStorage.setItem(KEYS.CustomerApprovers, JSON.stringify(CustomerApprovers));
}

export function deleteCustomerApprover(id) {
    let CustomerApprovers = getAllCustomerApprovers();
    CustomerApprovers = CustomerApprovers.filter(x => x.id !== id)
    localStorage.setItem(KEYS.CustomerApprovers, JSON.stringify(CustomerApprovers));
}

export function generateCustomerApproverId() {
    if (localStorage.getItem(KEYS.CustomerApproverId) == null)
        localStorage.setItem(KEYS.CustomerApproverId, '0')
    var id = parseInt(localStorage.getItem(KEYS.CustomerApproverId))
    localStorage.setItem(KEYS.CustomerApproverId, (++id).toString())
    return id;
}

export function getAllCustomerApprovers() {
    if (localStorage.getItem(KEYS.CustomerApprovers) == null)
        localStorage.setItem(KEYS.CustomerApprovers, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.CustomerApprovers));
    // let vendors = JSON.parse(localStorage.getItem(KEYS.vendors));
    //map departmentID to department title
    // let states = getStateCollection();
    // let toscs = getTypeOfSupplierCollection();
    // let prodsegnames = getProdSegNameCollection();
    // return vendors.map(x => ({
    //     ...x,
    //     state: states[x.stateId - 1].title,
    //     tosc: toscs[x.toscId - 1].title,
    //     prodsegname: prodsegnames[x.prodsegnameId - 1].title
    // }))
}