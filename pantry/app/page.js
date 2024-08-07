'use client'
import { useState , useEffect } from "react";
import { firestore } from './firebase';
import { Box, Button, Modal, Stack, TextField, Typography, } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {collection,query,getDocs,deleteDoc,doc,getDoc,setDoc, where} from "firebase/firestore";

export default function Home() {
  const[inventory,setInventory]=useState([]);
  const[open,setOpen] = useState(false);
  const[itemName,setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocs, setFilteredDocs] = useState([]);


  
  
  const updateInventory = async () => {
    const snapshot = query(collection(firestore,'inventory'));
    const docs = await getDocs(snapshot)
    const inventoryList=[]
    docs.forEach((doc)=>{
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
    setFilteredDocs(inventoryList)
  }
  const addItem = async (item) => {
    // this gets direct item ref
    const docRef = doc(collection(firestore,'inventory'),item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const{quantity}=docSnap.data()
        await setDoc(docRef, {quantity:quantity+1})
      }else{
        await setDoc(docRef, {quantity: 1})
      }
      await updateInventory()
    }

  const removeItem = async (item) => {
    // this gets direct item ref
    const docRef = doc(collection(firestore,'inventory'),item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const{quantity}=docSnap.data()
      if(quantity===1){
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity:quantity-1})
      }
      }
      await updateInventory()
    }
   
  useEffect(() =>{
    updateInventory()
  }, [])

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredDocs(inventory)
    } else {
      setFilteredDocs(
        inventory.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }
  }, [searchQuery, inventory])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return ( 
<Box width ="100vw" 
height = "100vh" 
display = "flex"
flexDirection={"column"}
 justifyContent="center" 
 alignItems="center" 
 gap={2}>
  <Modal open = {open} onClose={handleClose}> 
    <Box
    position="absolute" top="50%" 
    left ="50%"
    transform="translate(-50%,-50%)"
    width={400}
    bgcolor="white"
    border="2px solid #000"
    boxShadow={24}
    p={4}
    display="flex"
    flexDirection="column"
    gap={3}
    SX={{
      transform:'translate(-50%,-50%)',
    }}
    
    >
       <Typography variant="h6">Add Item</Typography>
       <Stack width="100%" direction="row" spacing={2}> 
        <TextField 
        variant='outlined'
        fullWidth
        value={itemName}
        
        onChange={(e) => { 
          setItemName(e.target.value)
        }}
    />
      <Button
     variant="outlined" onClick ={() => {
      addItem(itemName)
      setItemName('')
      handleClose()
     }} >Add</Button>
       </Stack>
    </Box>
     </Modal>
    
     <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Enter Product name"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
     <Button variant = "contained" onClick={() => {
          handleOpen()
     }}>

    Add New Item </Button>

    <Box border = "1px solid #333 ">
      <Box width="800px" height="100px" bgcolor="#ADD8E6" alignItems="center" justifyContent="center">
        <Typography variant='h2' color = '#333' justifyContent="center" display = "flex"> 
      Pantry Items
        </Typography>
      </Box>
    
    <Stack width = "800px" height = "300px" spacing={2} overflow="auto"> 
      {filteredDocs.map(({name, quantity})=>(
          <Box key={name} width="100%" minHeight="150px" display="flex"
          alignItems="center" justifyContent="space-between" bgColor="#f0f0f0" padding={5} >
            <Typography variant = 'h3'color= '#333' textAlign="center">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant = "h3" color="#333" textAlign = "center">
              {quantity}
            </Typography>
            <Stack direction="row" spacing ={2}>
          <Button 
          variant = "contained" onClick={() => {
                addItem(name)
            }}>
            Add
            </Button>
            <Button
            variant = "contained" onClick={() => {
                removeItem(name)
            }}>
                Remove
            </Button>
            </Stack>
          </Box>
      ))}
    </Stack>
    </Box>
  </Box>
 )
}
