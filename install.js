module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://huggingface.co/spaces/cocktailpeanut/PhotoMaker-V2 app",
        ]
      }
    },
    {
      when: "{{gpu==='nvidia'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "conda install -y anaconda::cudnn --update-deps --force-reinstall"
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          // xformers: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install gradio==5.49.1 devicetorch",
          "uv pip install -r requirements.txt",
          "uv pip install transformers==4.56.1 numpy==1.26.4 peft==0.17.1 huggingface_hub==0.36"
        ]
      }
    }
  ]
}
