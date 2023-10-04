import { ref, computed } from 'vue';
import { useFirebaseStorage } from 'vuefire';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { uid } from 'uid';

export default function useImage() {

    const url = ref('');
    const storage = useFirebaseStorage();

    const onFileChange = e => {
        const file = e.target.files[0];
        const fileName = uid() + '.jpg'
        const sRef = storageRef(storage, '/products/' + fileName);


        //sube el archivo

        const uploadTask = uploadBytesResumable(sRef,file);

        uploadTask.on('state_changed',
            () =>{},
            (error) =>{console.log(error)},
            () =>{
                //La imagen ya se subio
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((getDownloadURL)=>{
                        url.value=getDownloadURL
                    })
            },
        )
    }

    const isImageUploaded = computed(() =>{
        return url.value ? url.value : null
    })

    return {
        url,
        onFileChange,
        isImageUploaded
    }
}