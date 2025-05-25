"use client";

import { FormCore } from "@/type";
import Editor from "@draft-js-plugins/editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import "@draft-js-plugins/static-toolbar/lib/plugin.css"; // cần import CSS
import { convertFromHTML } from "draft-convert";
import { ContentBlock, ContentState, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { useEffect, useRef, useState } from "react";

type TProps = {
      namespace: "title" | "input";
      onUpdate: (html: string, plainText: string) => void;
      config: FormCore.Form;
      defaultValue: string;
      styleObj: Record<string, string | number>;
};

const EditorWriter = (props: TProps) => {
      const { namespace, onUpdate, config, defaultValue, styleObj = {} } = props;
      const [editorState, setEditorState] = useState<EditorState>(() => {
            if (!defaultValue) {
                  return EditorState.createEmpty();
            }
            const html = defaultValue?.replaceAll("\\n", "") || "";

            const convertHtml = convertFromHTML({
                  htmlToBlock: (nodeName, node) => {
                        if (nodeName === "h1") {
                              return "header-one";
                        }
                        return undefined;
                  },
            });
            const blocksFromHTML = convertHtml(html);
            return EditorState.createWithContent(blocksFromHTML);
      });
      const [html, setHtml] = useState("");
      const editorRef = useRef<Editor>(null);

      useEffect(() => {
            if (!defaultValue) {
                  if (!editorState.getCurrentContent().hasText()) return; // tránh set nếu editor rỗng
                  setEditorState(EditorState.createEmpty());
                  setHtml("");
                  return;
            }

            const htmlStr = defaultValue.replaceAll("\\n", "");

            // Chuyển HTML thành ContentState
            const convertHtml = convertFromHTML({
                  htmlToBlock: (nodeName, node) => {
                        if (nodeName === "h1") {
                              return "header-one";
                        }
                        return undefined;
                  },
            });

            const blocksFromHTML = convertHtml(htmlStr);

            // So sánh content mới với content hiện tại, nếu giống thì không set
            const newContent = blocksFromHTML;
            const currentContent = editorState.getCurrentContent();

            if (newContent === currentContent || newContent?.getPlainText() === currentContent.getPlainText()) {
                  // Nội dung không đổi, không set editorState => tránh loop
                  return;
            }

            const newState = EditorState.createWithContent(newContent);

            // Đặt cursor về cuối
            const lastBlock = newContent.getLastBlock();
            const lastBlockKey = lastBlock.getKey();
            const lastOffset = lastBlock.getLength();

            const selection = newState.getSelection().merge({
                  anchorKey: lastBlockKey,
                  anchorOffset: lastOffset,
                  focusKey: lastBlockKey,
                  focusOffset: lastOffset,
                  isBackward: false,
            });

            const newStateWithCursorAtEnd = EditorState.forceSelection(newState, selection);

            setEditorState(newStateWithCursorAtEnd);

            // Cập nhật html
            if (namespace === "title") {
                  const blocks: ContentBlock[] = newContent
                        .getBlockMap()
                        .toArray()
                        .map((block) => block.set("type", "header-one") as ContentBlock);

                  const newContentWithHeader = ContentState.createFromBlockArray(blocks);

                  const htmlWithStyle = stateToHTML(newContentWithHeader, {
                        blockRenderers: {
                              "header-one": (block) =>
                                    `<h1 data-html-editor="true" class='headingOne' style='${styleToString(styleObj ?? {})}'>${block.getText()}</h1>`,
                        },
                  });
                  setHtml(htmlWithStyle);
            }
      }, [defaultValue, styleObj]);

      const styleToString = (style: Record<string, string | number>) => {
            return Object.entries(style)
                  .map(([key, value]) => {
                        const kebabKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
                        return `${kebabKey}: ${value}`;
                  })
                  .join("; ");
      };
      return (
            <div style={styleObj}>
                  <Editor
                        key={namespace}
                        editorState={editorState}
                        onBlur={() => {
                              const content = editorState.getCurrentContent();
                              const plainText = content.getPlainText();
                              onUpdate(html, plainText?.replaceAll('\\n', ''));
                        }}
                        onChange={(state) => {
                              setEditorState(state);
                              const content = state.getCurrentContent();
                              let html = "";

                              if (namespace === "title") {
                                    const blocks: ContentBlock[] = content
                                          .getBlockMap()
                                          .toArray()
                                          .map((block) => block.set("type", "header-one") as ContentBlock);

                                    const newContent = ContentState.createFromBlockArray(blocks);

                                    html = stateToHTML(newContent, {
                                          blockRenderers: {
                                                "header-one": (block) =>
                                                      `<h1 data-html-editor="true" class='headingOne'  style='${styleToString(
                                                            styleObj ?? {},
                                                      )}'>${block.getText()}</h1>`,
                                          },
                                    });
                              } else {
                                    html = stateToHTML(content); // render mặc định
                              }
                              setHtml(html);
                        }}
                        ref={editorRef}
                  />
            </div>
      );
};

export default EditorWriter;
