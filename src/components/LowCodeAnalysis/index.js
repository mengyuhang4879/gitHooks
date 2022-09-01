import React from 'react';
import { Loading } from '@alifd/next';
import { buildComponents, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class LowCodeAnalysis extends React.Component {
    state = {
        data: {},
        inited: false
    };
    init = async () => {
        const { projectSchema, packages } = this.props,
            { componentsMap: componentsMapArray, componentsTree } =
                projectSchema,
            componentsMap = {};

        componentsMapArray.forEach(component => {
            componentsMap[component.componentName] = component;
        });
        const schema = componentsTree[0],
            libraryMap = {},
            libraryAsset = [];

        packages.forEach(({ package: _package, library, urls, renderUrls }) => {
            libraryMap[_package] = library;
            if (renderUrls) {
                libraryAsset.push(renderUrls);
            } else if (urls) {
                libraryAsset.push(urls);
            }
        });

        const assetLoader = new AssetLoader();

        await assetLoader.load(libraryAsset);
        const components = await injectComponents(
            buildComponents(libraryMap, componentsMap)
        );

        this.setState({
            data: {
                schema,
                components
            }
        });
    };

    //获取form数据
    getSchemaForm = (schema, ref) => {
        if (schema.componentName === 'Form') {
            if (this.props.needInitFormData) {
                if (!this.state.inited) {
                    ref.formRef.current.setFieldsValue(this.props.defaultForm);
                    this.setState({ inited: true });
                }
            }
            let formData = ref.formRef.current.getFieldsValue();

            this.props.getFormData(formData);
        }
    };

    render() {
        const { schema, components } = this.state.data;

        if (!schema || !components) {
            this.init();
            return <Loading fullScreen />;
        }

        return (
            <div className="lowcode-plugin-sample-preview">
                <ReactRenderer
                    className="lowcode-plugin-sample-preview-content"
                    schema={schema}
                    components={components}
                    onCompGetRef={(schema, ref) => {
                        this.getSchemaForm(schema, ref);
                    }}
                    appHelper={{
                        requestHandlersMap: {
                            fetch: createFetchHandler()
                        }
                    }}
                />
            </div>
        );
    }
}

export default LowCodeAnalysis;
