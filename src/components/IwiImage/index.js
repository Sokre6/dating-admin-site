import { Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { FileApi } from "../../http";

export const IwiImage = (props) => {

    const [data, setData] = useState();

    useEffect(() => {

        let mounted = true;

        (async function () {

            const data = await FileApi.getFileById(props.imageId);

            if (mounted) {
                setData(data);
            }

        })();

        return () => {
            mounted = false;
        }

    }, [props.imageId])


    return !!data ?
        <Image
            {...props}
            src={`data:${data.contentType};base64, ${data.contentBase64}`}
            alt={data.originalFilename}
        />
        : 'Loading image...';

}