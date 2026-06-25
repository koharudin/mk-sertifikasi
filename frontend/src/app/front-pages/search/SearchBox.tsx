import CustomTextField from "@/@core/components/mui/TextField";
import { Button, Box } from "@mui/material";

import styles from './styles.module.css'

export default function SearchBox() {

    return (
        <Box
            sx={{
                width: '200%',
                maxWidth: '1400px',
                margin: '0 auto'
            }}
        >

            <div className='flex items-center w-full'>

                <CustomTextField
                    fullWidth
                    size='small'
                    className={styles.inputBorder}
                    placeholder='Cari judul, konten, atau kata kunci...'
                    sx={{
                        flex: 1,

                        '& .MuiInputBase-root': {
                            background: '#fff',
                            borderStartEndRadius: '0 !important',
                            borderEndEndRadius: '0 !important',
                            borderStartStartRadius: '999px !important',
                            borderEndStartRadius: '999px !important',
                            minHeight: '46px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                        },

                        '& .MuiInputBase-input': {
                            fontSize: '15px',
                            paddingLeft: '10px'
                        }
                    }}
                />

                <Button
                    variant='contained'
                    color='primary'
                    sx={{
                        borderStartStartRadius: 0,
                        borderEndStartRadius: 0,
                        borderStartEndRadius: '999px',
                        borderEndEndRadius: '999px',
                        minHeight: '46px',
                        paddingInline: 4,
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                    }}
                >
                    Cari
                </Button>

            </div>

        </Box>
    )
}